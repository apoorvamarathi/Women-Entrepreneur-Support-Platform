# Women Entrepreneur Support Platform - Quick Start Guide

## Project Overview
A comprehensive platform connecting women entrepreneurs with mentors, funding opportunities, training programs, and community support.

**Tech Stack:**
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Authentication:** JWT Tokens

---

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for database)

---

## 🚀 Getting Started

### 1. Clone/Setup Project
```bash
cd "Women-Entrepreneur-Support-Platform"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

**Configure Environment Variables:**
Create a `.env` file in the backend folder:
```env
MONGO_URI=mongodb://craftt070_db_user:D03Pj4fm8my9hMte@ac-d3asr8z-shard-00-00.0bviovu.mongodb.net:27017,ac-d3asr8z-shard-00-01.0bviovu.mongodb.net:27017,ac-d3asr8z-shard-00-02.0bviovu.mongodb.net:27017/?ssl=true&replicaSet=atlas-lta5f7-shard-0&authSource=admin&appName=Cluster0
PORT=5000
JWT_SECRET=6765657
```

**Start Backend Server:**
```bash
npm start
```
Server runs on: `http://localhost:5000`

### 3. Frontend Setup

In a new terminal:
```bash
cd frontend
npm install
```

**Start Frontend Development Server:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 🔑 Features Available

### Authentication
- ✅ User Registration (Entrepreneur, Mentor, Investor)
- ✅ Login
- ✅ Forgot Password
- ✅ JWT Token-based Sessions

### Dashboard
- ✅ Analytics Overview
- ✅ Platform Statistics
- ✅ User Growth Charts
- ✅ Funding Trends

### Business Profile Management
- ✅ Create/Edit Business Profile
- ✅ Industry Selection
- ✅ Business Stage Tracking
- ✅ Funding Requirements

### Mentorship
- ✅ Browse Available Mentors
- ✅ Request Mentorship Sessions
- ✅ Track Session Status
- ✅ Automated Notifications

### Training Programs
- ✅ Browse Training Courses
- ✅ Enroll in Programs
- ✅ Track Progress
- ✅ Certificate Management

### Funding
- ✅ Submit Funding Applications
- ✅ Upload Pitch Decks
- ✅ Track Application Status
- ✅ Receive Status Updates

### Events & Webinars
- ✅ Browse Upcoming Events
- ✅ Event Registration
- ✅ Speaker Information
- ✅ Event Scheduling

### Community
- ✅ Discussion Forum
- ✅ Ask Questions
- ✅ Reply to Posts
- ✅ Connect with Other Entrepreneurs

### Resources
- ✅ Business Guides
- ✅ Startup Templates
- ✅ Video Tutorials
- ✅ Knowledge Base

---

## 📱 User Roles

### Entrepreneur
- Create business profile
- Request mentorship
- Apply for funding
- Enroll in training
- Participate in community

### Mentor
- Build mentor profile
- Accept mentorship requests
- Conduct sessions
- Provide guidance

### Investor
- Review funding applications
- Track opportunities
- Manage portfolio

---

## 🔗 API Endpoints

### Authentication
```
POST /api/auth/register       - Register new user
POST /api/auth/login          - Login user
POST /api/auth/forgot-password - Reset password
```

### Profile
```
GET  /api/profile             - Get user profile
PUT  /api/profile             - Update profile
```

### Mentorship
```
GET  /api/mentorship/mentors  - Get available mentors
GET  /api/mentorship/sessions - Get user sessions (upcoming/previous)
POST /api/mentorship/request  - Request mentorship
PUT  /api/mentorship/request/:id - Update request status
```

### Training
```
GET  /api/training            - Get all programs
POST /api/training/:id/enroll - Enroll in program
```

### Funding
```
GET  /api/funding             - Get applications
POST /api/funding             - Submit application
PUT  /api/funding/:id         - Update status
```

### Events
```
GET  /api/events              - Get events
POST /api/events/:id/register - Register for event
```

### Community
```
GET  /api/community/posts     - Get posts
GET  /api/community/groups    - Get networking groups
POST /api/community/posts     - Create post
POST /api/community/posts/:id/reply - Reply to post
```

### Notifications
```
GET  /api/notifications       - Get notifications
PUT  /api/notifications/:id/read - Mark as read
```

### Analytics
```
GET  /api/analytics/dashboard - Get dashboard data
```

---

## 🧪 Testing

### Test User Accounts
Feel free to register new accounts or use test scripts:

```bash
# In backend folder
node test_register.js     # Test registration
node test_login.js        # Test login
```

### API Testing
Use Postman or Thunder Client to test endpoints:
1. Register a user
2. Copy the token from response
3. Add to requests: `Authorization: Bearer <token>`

---

## 📂 Project Structure

```
Women-Entrepreneur-Support-Platform/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── AppRouter.jsx
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── store/
│   └── package.json
│
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── utils/
    ├── server.js
    ├── package.json
    └── .env
```

---

## 🔐 Security Notes

1. **Never commit .env files** - Keep credentials private
2. **Passwords** - Hashed with bcrypt
3. **Tokens** - JWT with 30-day expiration
4. **Protected Routes** - All sensitive endpoints require authentication

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check MongoDB connection
# Verify .env variables are correct
# Try: npm install again
```

### Frontend can't connect to backend
```bash
# Check backend is running on port 5000
# Verify CORS settings in server.js
# Check Network tab in browser DevTools
```

### Port already in use
```bash
# Change PORT in .env (backend)
# Change port in vite.config.js (frontend)
```

---

## 📚 Documentation Files

- **API_DOCUMENTATION.md** - Complete API reference
- **COMPLETION_SUMMARY.md** - Features and improvements
- **README.md** - Project overview

---

## 🎯 Next Steps

1. ✅ Start backend server
2. ✅ Start frontend server
3. ✅ Register a new account
4. ✅ Explore the platform
5. ✅ Test different features

---

## 💡 Tips

- Frontend routes are in `AppRouter.jsx` (some are commented out)
- API endpoints defined in `services/api.js`
- State management in `store/useAuthStore.js`
- All API calls use the api service wrapper

---

## 📞 Support

For issues or questions:
1. Check API_DOCUMENTATION.md
2. Review error messages in browser console
3. Check backend server logs
4. Verify database connection

---

**Happy Building! 🚀**
