# WELCOME TO THE CYBER-GYM

## Installation Instructions

### Prerequisites
- Ensure you have Node.js and npm installed for the frontend.
- Ensure you have Python and pip installed for the backend.
- Ensure you have Docker installed for running challenges.

### Setup

#### 1. **Backend Setup** (Start this first)
Navigate to the `Backend` directory:
```bash
cd Backend
```

Install the backend dependencies:
```bash
pip install -r requirements.txt
```

Create a `.env` file in the `Backend` directory and add your Gemini API key:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

Run the backend server:
```bash
uvicorn main:app --port 4040
```

The backend will now be running on `http://localhost:4040`

#### 2. **Frontend Setup**
Navigate to the `cybergym` directory:
```bash
cd cybergym
```

Install the frontend dependencies:
```bash
npm install
```

Run the frontend development server:
```bash
npm run dev
```

The frontend will now be running on `http://localhost:3000`

#### 3. **Set API Key in Frontend**
Once the frontend is running, you need to configure the API key in the application:

1. Open the application in your browser
2. Click on the settings/API key icon
3. Enter your Gemini API key as shown below:

![API Key Setup](image.png)

Now you should have both the frontend and backend servers running for development. You can start creating and deploying cybersecurity challenges!