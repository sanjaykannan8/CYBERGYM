import os 
import yaml
import json
import time
import subprocess
from fastapi.responses import JSONResponse

def parse_challenge(yaml_string):
    """Parse YAML response and create exactly ONE challenge."""
    data = None
    
    try:
        # If wrapped in code blocks, extract the YAML content
        if "```yaml" in yaml_string:
            # Get only the FIRST yaml block to avoid parsing examples
            yaml_content = yaml_string.split("```yaml")[1].split("```")[0]
            data = yaml.safe_load(yaml_content)
        elif "```" in yaml_string:
            yaml_content = yaml_string.split("```")[1].split("```")[0]
            data = yaml.safe_load(yaml_content)
        else:
            # Try parsing as raw YAML
            data = yaml.safe_load(yaml_string)
    except Exception as e:
        print(f"YAML parsing failed: {e}")
        print(f"Raw output was:\n{yaml_string[:500]}...")
        return False
    
    # Validate that we have the required fields
    if not data or not isinstance(data, dict):
        print("ERROR: Parsed data is not a valid dictionary")
        return False
    
    if 'docker_run_command' not in data:
        print("ERROR: Missing 'docker_run_command' in response")
        return False
        
    if 'challenge_name' not in data:
        print("ERROR: Missing 'challenge_name' in response")
        return False
    
    # Create the challenge files (only once!)
    create_challenge_files(data)
    return True
  

def create_challenge_files(data):
    with open("config.json", "r") as f:
        config = json.load(f)   
        battle_number = config["battle_number"]
    config["battle_number"] = battle_number + 1
    with open("config.json", "w") as f:
        json.dump(config, f)

   
    challenge_dir = f"Challenges/battle{battle_number}"
    abs_challenge_dir = os.path.abspath(challenge_dir)
    os.makedirs(abs_challenge_dir, exist_ok=True)
    
    # These are metadata keys, not files to create
    metadata_keys = ['docker_run_command', 'challenge_name', 'build_command', 'run_command']
    
    for filename, content in data.items():
        # Skip metadata keys - they're not actual files
        if filename in metadata_keys:
            continue
            
        # Handle nested directories (like templates/login.html)
        file_path = os.path.join(abs_challenge_dir, filename)
        
        # Create parent directories if they don't exist
        parent_dir = os.path.dirname(file_path)
        if parent_dir and parent_dir != abs_challenge_dir:
            os.makedirs(parent_dir, exist_ok=True)
        
        # Write the file content - strip leading/trailing whitespace for cleaner files
        with open(file_path, "w", encoding='utf-8', newline='\n') as f:
            if isinstance(content, str):
                f.write(content.strip() + '\n')
            else:
                f.write(str(content))
        print(f"Created: {file_path}")
    
    # Give Windows time to release file handles
    time.sleep(1)
    
    docker_run_command = data["docker_run_command"]
    challenge_name = data["challenge_name"]
    build_dockerfile(abs_challenge_dir, docker_run_command, challenge_name)
    
def build_dockerfile(abs_challenge_dir, docker_run_command, challenge_name):
    """Build Docker image from the challenge directory using absolute paths."""
    image_name = os.path.basename(abs_challenge_dir)
    original_dir = os.getcwd()
    
    print(f"Building Docker image: {image_name}")
    print(f"Challenge directory: {abs_challenge_dir}")
    
    try:
        # Use subprocess with absolute path instead of changing directory
        # This avoids file locking issues on Windows
        result = subprocess.run(
            ["docker", "build", "-t", image_name, abs_challenge_dir],
            capture_output=True,
            text=True,
            cwd=original_dir  # Stay in original directory
        )
        
        if result.returncode != 0:
            print(f"ERROR: Docker build failed with exit code {result.returncode}")
            print(f"STDOUT: {result.stdout}")
            print(f"STDERR: {result.stderr}")
            return False
            
        print(f"Successfully built: {image_name}")
        print(result.stdout)
        
    except Exception as e:
        print(f"Error during Docker build: {e}")
        return False
    
    # Update challenges.json
    try:
        with open("challenges.json", "r") as f:
            challenges = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        challenges = []
        
    challenges.append({
        "challenge_name": challenge_name,
        "description": image_name,
        "build_command": f"docker build -t {image_name} .",
        "run_command": f"{docker_run_command.replace('[imagename]', image_name)}",
        "remove_command": f"docker rmi {image_name}"
    })
    
    with open("challenges.json", "w") as f:
        json.dump(challenges, f, indent=2)
    print(f"Added {image_name} to challenges.json")
    return True


if __name__ == "__main__":
    build_dockerfile("Challenges/battle1", "docker run -p 8000:8000 -it [imagename]", "Test Challenge")
    