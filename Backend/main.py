from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import json
import os
import shutil
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware import Middleware
import agent
import subprocess




app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/challenges")
async def get_challenges():
    with open("challenges.json", "r") as f:
        content = json.load(f)
        return JSONResponse(content={"challenges": content})

@app.post("/create_challenge")
async def create_challenge(request: Request):
    data = await request.json() 
    challenge_description = data.get("challenge_description")
    x=agent.generate_challenge_layout(challenge_description)
    if x:
        return JSONResponse(content={"message": "Challenge created"})
    else:
        return JSONResponse(content={"message": "Challenge not created"})

@app.post("/delete_challenge")
async def delete_challenge(request: Request):
    data = await request.json()
    challenge_description = data.get("challenge_description")  # This is the battle name like "battle2"
    print(f"Deleting challenge: {challenge_description}")
    
    try:
        # 1. Remove Docker image (ignore errors if image doesn't exist)
        try:
            result = subprocess.run(
                ["docker", "rmi", challenge_description, "-f"],
                capture_output=True,
                text=True
            )
            if result.returncode == 0:
                print(f"Docker image removed: {challenge_description}")
            else:
                print(f"Docker image not found or already removed: {result.stderr}")
        except Exception as e:
            print(f"Docker remove error (continuing anyway): {e}")
        
        # 2. Delete the challenge folder
        challenge_folder = os.path.join("Challenges", challenge_description)
        if os.path.exists(challenge_folder):
            shutil.rmtree(challenge_folder)
            print(f"Deleted folder: {challenge_folder}")
        else:
            print(f"Folder not found: {challenge_folder}")
        
        # 3. Remove from challenges.json
        with open("challenges.json", "r") as f:
            challenges = json.load(f)
        
        challenges = [c for c in challenges if c["description"] != challenge_description]
        
        with open("challenges.json", "w") as f:
            json.dump(challenges, f, indent=2)
        print(f"Removed {challenge_description} from challenges.json")
        
        # 4. Decrement battle_number in config.json
        with open("config.json", "r") as f:
            config = json.load(f)
        
        if config["battle_number"] > 0:
            config["battle_number"] -= 1
            
        with open("config.json", "w") as f:
            json.dump(config, f)
        print(f"Updated battle_number to: {config['battle_number']}")
        
        return JSONResponse(content={"message": "Challenge deleted successfully"})
        
    except Exception as e:
        print(f"Error deleting challenge: {e}")
        return JSONResponse(content={"message": f"Error deleting challenge: {str(e)}"}, status_code=500)

@app.post("/cleanup_orphans")
async def cleanup_orphans():
    """Remove orphaned challenge folders and docker images that aren't in challenges.json"""
    cleaned = []
    
    try:
        # Get list of valid challenges from challenges.json
        with open("challenges.json", "r") as f:
            challenges = json.load(f)
        valid_descriptions = {c["description"] for c in challenges}
        
        # Check Challenges folder for orphaned folders
        challenges_dir = "Challenges"
        if os.path.exists(challenges_dir):
            for folder in os.listdir(challenges_dir):
                folder_path = os.path.join(challenges_dir, folder)
                if os.path.isdir(folder_path) and folder not in valid_descriptions:
                    # Remove orphaned folder
                    shutil.rmtree(folder_path)
                    cleaned.append(f"Removed folder: {folder}")
                    
                    # Try to remove docker image too
                    subprocess.run(["docker", "rmi", folder, "-f"], capture_output=True)
                    cleaned.append(f"Removed docker image: {folder}")
        
        return JSONResponse(content={"message": "Cleanup complete", "cleaned": cleaned})
        
    except Exception as e:
        return JSONResponse(content={"message": f"Cleanup error: {str(e)}"}, status_code=500)
    
@app.post("/run_challenge")
async def run_challenge(request: Request):
      data = await request.json()
      challenge_name = data.get("challenge_description")
      print(f"Received challenge_name: '{challenge_name}'")
      
      with open("challenges.json", "r") as f:
        challenges = json.load(f)
      
      print(f"Available challenges: {challenges}")
      
      for challenge in challenges:
            print(f"Checking challenge description: '{challenge['description']}'")
            if challenge["description"] == challenge_name:
                print(f"Found challenge: {challenge_name}")
                print(f"Run command: {challenge['run_command']}")
                run_cmd = challenge["run_command"]
                full_command = f'start "Docker Challenge" cmd.exe /k "{run_cmd}"'
                print(f"Executing: {full_command}")
                result = os.system(full_command)
                print(f"Command result: {result}")
                return JSONResponse(content={"message": "Challenge running"})
      return JSONResponse(content={"message": "Challenge not found"})

@app.post("/stop_challenge")
async def stop_challenge(request: Request):
    """Stop running Docker containers for a challenge"""
    try:
        data = await request.json()
        challenge_name = data.get("challenge_description")
        print(f"Stopping containers for challenge: {challenge_name}")
        
        # Get list of running containers for this challenge
        result = subprocess.run(
            ["docker", "ps", "--filter", f"ancestor={challenge_name}", "--format", "{{.ID}}"],
            capture_output=True,
            text=True
        )
        
        if result.returncode != 0:
            return JSONResponse(
                content={"message": "Failed to list containers"}, 
                status_code=500
            )
        
        container_ids = result.stdout.strip().split('\n')
        container_ids = [cid for cid in container_ids if cid]  # Remove empty strings
        
        if not container_ids:
            return JSONResponse(content={"message": "No running containers found"})
        
        # Stop all containers
        stopped_count = 0
        for container_id in container_ids:
            stop_result = subprocess.run(
                ["docker", "stop", container_id],
                capture_output=True,
                text=True
            )
            if stop_result.returncode == 0:
                stopped_count += 1
                print(f"Stopped container: {container_id}")
        
        return JSONResponse(content={
            "message": f"Stopped {stopped_count} container(s)",
            "stopped": stopped_count
        })
        
    except Exception as e:
        print(f"Error stopping containers: {e}")
        return JSONResponse(
            content={"message": f"Error: {str(e)}"}, 
            status_code=500
        )

@app.post("/set_api_key")
async def set_api_key(request: Request):
    """Save Gemini API key to .env file"""
    try:
        data = await request.json()
        api_key = data.get("api_key", "").strip()
        
        if not api_key:
            return JSONResponse(
                content={"message": "API key is required"}, 
                status_code=400
            )
        
        # Get the project root directory path (one level up from Backend)
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(backend_dir)
        env_path = os.path.join(project_root, ".env")
        
        # Read existing .env content if it exists, filtering out old API key
        existing_lines = []
        if os.path.exists(env_path):
            with open(env_path, "r", encoding="utf-8") as f:
                existing_lines = [
                    line.rstrip("\n\r") 
                    for line in f.readlines() 
                    if line.strip() and not line.startswith("GEMINI_API_KEY=")
                ]
        
        # Write the updated .env file
        with open(env_path, "w", encoding="utf-8", newline="\n") as f:
            # Write existing content first
            for line in existing_lines:
                f.write(f"{line}\n")
            # Add or update the API key
            f.write(f'GEMINI_API_KEY="{api_key}"\n')
        
        print(f"API key saved successfully to {env_path}")
        return JSONResponse(content={"message": "API key saved successfully"})
        
    except Exception as e:
        print(f"Error saving API key: {e}")
        return JSONResponse(
            content={"message": f"Error saving API key: {str(e)}"}, 
            status_code=500
        )