
# NoteMaster – HighwayDelite Assignment

NoteMaster is a simple note-taking web app built for HighwayDelite as part of an assignment. It offers both Google OAuth and Email OTP-based authentication. Users can create and delete tasks/notes.


## Live Demo

[Vercel deployed link](https://highway-delite-assignment-inky.vercel.app/)


##  Features

- Google OAuth Login/Signup
- Email-based OTP Authentication
- Dashboard with:
  -  Add new notes/tasks
  -  Delete notes
- (To implement) Update/edit note functionality
- (To implement) Sign-out functionality

## Tech Stack

### Frontend

- React.js (with Vite)
-  TypeScript
- React Router dom
- recoil
- axios
- React toastify
- lucide react

### Backend

- Express.js
- TypeScript
- JWT 
- Nodemailer for OTP-based auth
- Google OAuth 2.0 - with passport.js
- MongoDB + Mongoose

## Installation

1. Clone the repository:
```bash
git clone https://github.com/DNAVEEN74/HighwayDeliteAssignment.git
```

2. Navigate to the project directory:
```bash
cd HighwayDeliteAssignment
```

Install dependencies for both the frontend and backend:

**For backend:**
 1. Install dependencies for both the backend
```bash
cd backend
npm install
```
2. Create ` .env` file:
 ``` bash
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGO_URI=your_mongodb_connection_uri
```
3.  Start backend server:
```bash 
npx ts-node src/server.ts
```
**For frontend:**
1. Install dependencies for both the frontend
```bash
cd frontend
npm install
```
2. Start the frontend server
```bash 
npm run dev
```
3. Open your browser and go to: http://localhost:5173