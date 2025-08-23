from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import json
import os
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