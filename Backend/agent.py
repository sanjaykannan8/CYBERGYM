from google import genai
from google.genai import types
import filemanager
import yaml
import json
from dotenv import load_dotenv
load_dotenv()
import os

env_path = os.path.join(os.path.dirname(__file__),"..",'.env')

def parse_challenge(yaml_string):
    try:
        data = yaml_string.split("```yaml")[1].split("```")[0]
        data = yaml.safe_load(data)    
        return data
    except Exception as e:
        print(e)
        return None

def generate_challenge_layout(query):
    client = genai.Client(
        api_key=os.getenv("GEMINI_API_KEY")
    )

    model = "gemini-2.0-flash"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=query),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        system_instruction=[
            types.Part.from_text(text="""You are Agent 1: a challenge layout designer for a cybersecurity training platform called CyberGym. 

Your task is to analyze the user's request and create a complete file structure for a cybersecurity challenge. Based on the user's query, determine what type of challenge they want and create ALL necessary files.

IMPORTANT: You must provide a COMPLETE response with ALL required fields. Do not provide partial or shortened responses.

Required Output Format (YAML only, no markdown, no explanations):

challenge_name: [Descriptive name for the challenge]
file_names:
  - [file1.extension]
  - [file2.extension]
  - [file3.extension]
  - requirements.txt
  - Dockerfile
  - README.md
build_command: docker build -t challenge_container .
run_command: docker run -it challenge_container

Example for SQL Injection challenge:

challenge_name: SQL Injection Login Bypass
file_names:
  - app.py
  - templates/login.html
  - templates/welcome.html
  - requirements.txt
  - Dockerfile
  - README.md
build_command: docker build -t challenge_container .
run_command: docker run -it challenge_container

Rules:
1. ALWAYS provide the complete YAML structure above
2. Include ALL necessary files for the challenge type:
   - Web challenges: app.py, HTML templates, CSS if needed
   - Binary challenges: source files, Makefile, compiled binaries
   - Forensics: data files, analysis scripts
   - Crypto: challenge scripts, encrypted files
3. requirements.txt, Dockerfile, and README.md are MANDATORY
4. Use realistic file names and extensions
5. Include template/static folders for web challenges
6. Make the challenge name descriptive but concise
7. Always use proper YAML formatting with 2-space indentation

Analyze the user's request carefully and provide the COMPLETE file structure needed for that specific type of challenge."""),
        ],
    )
    result = ""
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        result += chunk.text
        
    generate_challenge_files(query, result)
        

def generate_challenge_files(query, challenge_layout):
    result = ""
    client = genai.Client(
        api_key=os.getenv("GEMINI_API_KEY")
    )

    model = "gemini-2.0-flash"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=query),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        system_instruction=[
            types.Part.from_text(text="""Role: Agent 2: A challenge file generator for CyberGym. Your primary function is to transform a high-level vulnerability request into a set of working, vulnerable code files ready for a Dockerized environment.

Task: Your task is to generate COMPLETE, FUNCTIONAL file contents for each file specified by Agent 1. You must create realistic, working code that demonstrates the specified cybersecurity vulnerability.

Input and Output
Input Analysis:

User's original challenge request.

Agent 1's YAML structure with file names.

Your Output Format (YAML only, no markdown, no explanations):
You will produce a single YAML output that includes both the file contents and the necessary Docker command to run the challenge.

CRITICAL INSTRUCTION: The placeholder [imagename] in the docker_run_command MUST remain unchanged. Never replace it with actual image names - it will be replaced programmatically.

docker_run_command: docker run -p 8000:8000 -it [imagename]

challenge_name: [challenge_name]

[filename1]: |
[complete file content with proper formatting]

[filename2]: |
[complete file content with proper formatting]

...

[etc for ALL files listed by Agent 1]

Example
Example for SQL Injection Challenge:

YAML

docker_run_command: docker run -p 8000:8000 -it [imagename]

challenge_name: SQL Injection 

app.py: |
  from flask import Flask, request, render_template
  import sqlite3
  import os

  app = Flask(__name__)
  DATABASE = 'users.db'

  def init_database():
      conn = sqlite3.connect(DATABASE)
      cursor = conn.cursor()
      cursor.execute('''
          CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              username TEXT NOT NULL,
              password TEXT NOT NULL
          )
      ''')
      cursor.execute("INSERT OR IGNORE INTO users (username, password) VALUES ('admin', 'password123')")
      cursor.execute("INSERT OR IGNORE INTO users (username, password) VALUES ('user', 'secret')")
      conn.commit()
      conn.close()

  @app.route('/')
  def index():
      return render_template('login.html')

  @app.route('/login', methods=['POST'])
  def login():
      username = request.form['username']
      password = request.form['password']

      # VULNERABLE: Direct string concatenation - SQL injection possible
      query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
      conn = sqlite3.connect(DATABASE)
      cursor = conn.cursor()
      cursor.execute(query)

      user = cursor.fetchone()
      conn.close()

      if user:
          return f"<h2>Welcome, {user[1]}!</h2><p>Login successful!</p>"
      else:
          return render_template('login.html', error='Invalid credentials')


Requirements for ALL files:
1. Generate COMPLETE, functional code - no placeholders or abbreviated sections
2. Include proper error handling and realistic functionality
3. Add helpful comments explaining vulnerabilities
4. Make HTML templates visually appealing with basic CSS
5. Ensure Dockerfiles can actually build and run
6. Create comprehensive README files with:
   - Clear challenge description
   - Build/run instructions
   - Vulnerability explanation
   - Exploitation hints
   - Learning objectives
7. Use proper file formatting and indentation
8. Include realistic data and examples
9. MANDATORY: Always keep [imagename] unchanged in the docker_run_command - never replace it with actual image names

Generate ALL files listed by Agent 1 with complete, functional content."""),
        ],
    )

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        result += chunk.text
    print(result)
    filemanager.parse_challenge(result)

if __name__ == "__main__":
    generate_challenge_layout("I need to practice privilge escalation")
