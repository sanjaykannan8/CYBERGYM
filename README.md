# WELCOME TO THE CYBER-GYM

## Installation Instructions

### Prerequisites
- Ensure you have Node.js and npm installed for the frontend.
- Ensure you have Python and pip installed for the backend.

### Setup

1. **Add API Key**
   - Create a `.env` file in the `cybergym` directory.
   - Add your API key to the `.env` file:
     ```
     API_KEY=your_api_key_here
     ```

2. **Frontend Setup**
   - Navigate to the `cybergym` directory:
     ```
     cd cybergym
     ```
   - Install the frontend dependencies:
     ```
     npm install
     ```
   - Run the frontend development server:
     ```
     npm run dev
     ```

3. **Backend Setup**
   - Navigate to the `backend` directory:
     ```
     cd backend
     ```
   - Install the backend dependencies:
     ```
     pip install fastapi uvicorn
     ```
   - Run the backend server:
     ```
     uvicorn main:app --reload
     ```

Now you should have both the frontend and backend servers running for development.