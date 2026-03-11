# Women Entrepreneur Support Platform

A comprehensive full-stack application designed to empower women entrepreneurs by connecting them with mentors, providing training programs, facilitating funding applications, and fostering a supportive community.

## Project Architecture

This project is a monorepo consisting of two main parts:

- **Frontend:** A React application built with Vite, utilizing Material UI for styling and layout.

## Frontend Implementation

The frontend of the Women Entrepreneur Support Platform is built using **React with Vite** for fast development and **Material UI** for modern UI components.

### Frontend Features

- Responsive user interface built with React
- Modern design using Material UI components
- Client-side routing using React Router DOM
- Role-based dashboard views
- API integration with backend services
- Form validation for user inputs
- Protected routes for authenticated users

### Frontend Pages

The application contains the following main pages:

- **Login Page** – Users can log in securely using their credentials.
- **Register Page** – New users can create accounts and choose their role (Entrepreneur, Mentor, Investor).
- **Dashboard** – Main user dashboard showing key information and quick access to features.
- **Profile Page** – Users can view and update their profile details.
- **Mentorship Page** – Entrepreneurs can browse mentors and send mentorship requests.
- **Training Programs Page** – Displays available learning programs and resources.
- **Funding Page** – Entrepreneurs can apply for funding opportunities and track applications.
- **Events Page** – Shows upcoming networking events and webinars.
- **Notifications Page** – Displays important updates and alerts for users.

### Frontend Technologies

- React
- Vite
- React Router DOM
- Material UI
- Axios (for API communication)

### Frontend Folder Structure

- **Backend:** A Node.js REST API built with Express, connected to a MongoDB database via Mongoose.

## Features

- **User Authentication:** Secure registration and login using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Role-Based Access Control:** Differentiated experiences for `entrepreneur`, `mentor`, `investor`, and `admin` roles.
- **Dynamic Profiles:** Specialized profiles for Entrepreneurs (business details, stage, funding requirements) and Mentors (industry expertise, availability).
- **Mentorship Matchmaking:** Entrepreneurs can browse available mentors and submit mentorship requests, which mentors can review and accept.
- **Training Programs:** Curated educational content and training modules.
- **Funding Opportunities:** A streamlined process for entrepreneurs to submit pitch decks and track funding application statuses with investors.
- **Community Events:** A central hub for networking and tracking upcoming events and webinars.
- **Notifications:** In-app notification system to keep users informed about their requests and applications.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (v16 or higher recommended)
- Default npm or yarn
- MongoDB (running locally or a MongoDB Atlas URI)

## Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd Women-Entrepreneur-Support-Platform
```

### 2. Backend Setup

Open a terminal and navigate to the `backend` directory:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory based on the following template:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/women_entrepreneur_db
JWT_SECRET=your_super_secret_jwt_key_here
```

Start the backend server:

```bash
# Start the server (runs on http://localhost:5000 by default)
node server.js
```

### 3. Frontend Setup

Open a new terminal and navigate to the `frontend` directory:

```bash
cd frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend should now be running, typically accessible at `http://localhost:5173`.

## Core API Endpoints

The backend exposes several modular API endpoints. All protected routes require a `Bearer` token in the `Authorization` header.

- **Auth:** `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- **Profile:** `GET /api/profile`, `PUT /api/profile`
- **Mentorship:** `GET /api/mentorship/mentors`, `POST /api/mentorship/request`, `PUT /api/mentorship/request/:id`
- **Training:** `GET /api/training`, `POST /api/training`
- **Funding:** `GET /api/funding`, `POST /api/funding`, `PUT /api/funding/:id`
- **Events:** `GET /api/events`, `POST /api/events`
- **Notifications:** `GET /api/notifications`, `PUT /api/notifications/:id/read`

## Technologies Used

- **Frontend:** React, Vite, React Router DOM, Material UI (@mui/material), Emotion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Security:** validation, JWT, bcryptjs
