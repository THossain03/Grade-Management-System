# Student Result Management System

## Overview
The Student Result Management System is a web application designed to efficiently manage student records, courses, and results. It features a modern, responsive interface and a robust backend API.

## Tech Stack

### Frontend
- **React.js**: Single Page Application (SPA) with navigation.
- **Material-UI**: For modern, responsive UI components.
- **Routing**: React Router for multi-page structure within the SPA.
- **Deployed on Render.com** as a static site.

### Backend
- **Flask (Python)**: Lightweight and fast framework for this project.
- **Flask-RESTful**: For API routing.
- **Flask-CORS**: For cross-origin requests from the frontend.
- **Deployed on Render.com** as a web service.

### Database
- **SQLite**: Simple, serverless database for persistent local storage.

## Features
- Add, view, and delete student records.
- Manage courses and results.
- Responsive design for seamless user experience.
- Deployed and accessible via public URLs.

## Deployment
- **Frontend**: Deployed as a static site on Render.com ([Live Link](https://grade-management-system-app.onrender.com))
- **Backend**: Deployed as a web service on Render.com ([API Link](https://grade-management-system-xmbf.onrender.com))
- **Environment Variables**: The frontend uses an environment variable `REACT_APP_API_URL` to connect to the backend API.

## Usage (Deployed Version)
1. Visit the [frontend link](https://grade-management-system-app.onrender.com).
2. Use the app to add, view, and manage students, courses, and results.

## Local Installation & Usage

### Backend
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. (Optional) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask app:
   ```bash
   python app.py
   ```
   The backend will be available at `http://localhost:5000` by default.

### Frontend
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` directory with the following content:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```
4. Start the React app:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000` by default.

## Design Considerations
- This implementation is tailored to the requirements of the assessment, focusing on core CRUD functionality and a clean, maintainable architecture.
- The application is structured to allow for easy extension, such as adding authentication, user roles, or advanced security features in a production environment.
- Security, data integrity, and scalability were considered in the design and can be further enhanced as needed.
