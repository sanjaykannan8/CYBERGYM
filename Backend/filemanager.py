import os 
import yaml
import json
from fastapi.responses import JSONResponse

def parse_challenge(yaml_string):
    try:
        data = yaml.safe_load(yaml_string)
        create_challenge_files(data)
        
    except Exception as e:
        data = yaml_string.split("```yaml")[1].split("```")[0]
        data = yaml.safe_load(data)
        create_challenge_files(data)
  

def create_challenge_files(data):
    with open("config.json", "r") as f:
        config = json.load(f)   
        battle_number = config["battle_number"]
    config["battle_number"] = battle_number + 1
    with open("config.json", "w") as f:
        json.dump(config, f)

   
    challenge_dir = f"Challenges/battle{battle_number}"
    os.makedirs(challenge_dir, exist_ok=True)
    

    for filename, content in data.items():
        # Handle nested directories (like templates/login.html)
        file_path = os.path.join(challenge_dir, filename)
        
        # Create parent directories if they don't exist
        parent_dir = os.path.dirname(file_path)
        if parent_dir and parent_dir != challenge_dir:
            os.makedirs(parent_dir, exist_ok=True)
        
        # Write the file content
        with open(file_path, "w", encoding='utf-8') as f:
            f.write(content)
        print(f"Created: {file_path}")
    docker_run_command = data["docker_run_command"]
    challenge_name = data["challenge_name"]
    build_dockerfile(challenge_dir,docker_run_command,challenge_name)
    
def build_dockerfile(challenge_dir,docker_run_command,challenge_name):
    os.chdir(challenge_dir)
    os.system(f"docker build -t {challenge_dir.split('/')[-1]} .")
    print(f"Built: {challenge_dir.split('/')[-1]}")
    os.chdir("../..")
    print(f"Changed directory to: {os.getcwd()}")
    with open("challenges.json", "r") as f:
        challenges = json.load(f)
        challenges.append({
            "challenge_name": challenge_name,
            "description": challenge_dir.split('/')[-1],
            "build_command": f"docker build -t {challenge_dir.split('/')[-1]} .",
            "run_command": f"{docker_run_command.replace('[imagename]',challenge_dir.split('/')[-1])}",
            "remove_command": f"docker rmi {challenge_dir.split('/')[-1]}"
        })
    with open("challenges.json", "w") as f:
        json.dump(challenges, f)
    print(f"Added {challenge_dir.split('/')[-1]} to challenges.json")
    return True


if __name__ == "__main__":
    build_dockerfile("Challenges/battle1")
    