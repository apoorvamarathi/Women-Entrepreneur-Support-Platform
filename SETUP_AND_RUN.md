# 🚀 Complete Setup & Running Guide

## Project: Women Entrepreneur Support Platform

A comprehensive platform for women entrepreneurs to connect with mentors, access funding opportunities, join training programs, and build community.

---

## 📋 Prerequisites

- **Node.js** v14 or higher
- **npm** (comes with Node.js)
- **MongoDB Atlas** account (database already set up)
- **Code Editor** (VS Code recommended)

---

## ⚙️ Installation & Setup

### Step 1: Clone/Open Project
```bash
cd "Women-Entrepreneur-Support-Platform"
```

### Step 2: Set Up Backend

#### Install Dependencies
```bash
cd backend
npm install
```

#### Verify .env Configuration
The `.env` file should already exist with:
```env
MONGO_URI=mongodb://craftt070_db_user:D03Pj4fm8my9hMte@ac-d3asr8z-shard-00-00.0bviovu.mongodb.net:27017,...
PORT=5000
JWT_SECRET=6765657
```

#### Start Backend Server
```bash
npm start
```

✅ Backend will run on: **http://localhost:5000**

You should see:
```
Server started on port 5000
MongoDB Connected
```

### Step 3: Set Up Frontend

In a **new terminal** window:

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start Frontend Development Server
```bash
npm run dev
```

✅ Frontend will run on: **http://localhost:5173**

You should see:
```
VITE v... ready in ... ms

➜  Local:   http://localhost:5173/
```

---

## 🔑 First Time Login / Registration

### Option 1: Create New Account
1. Open http://localhost:5173
2. Click "Register"
3. Fill in:
   - Full Name: (your name)
   - Email: (any email)
   - Password: (min 6 characters)
   - Role: Select **Entrepreneur** or **Mentor**
4. Click "Register"
5. ✅ You're logged in! Dashboard appears

### Option 2: Test User (if data exists)
If database already has test data:
1. Click "Login"
2. Enter email and password
3. Click "Login"

### Forgot Password
- Click "Forgot Password?" on login page
- Enter your email
- System will notify you (in real app, sends email)

---

## 📊 Dashboard Features

After login, you have access to:

### 1. **Dashboard** (`/dashboard`)
- View platform analytics
- See user growth charts
- Track funding trends
- Admin statistics

### 2. **Profile** (`/profile`)
- Create/Edit business profile
- Add business details (name, industry, stage)
- Set funding requirements
- Upload documents

### 3. **Mentorship** (`/mentorship`)
- Browse available mentors
- Filter by industry & experience
- Request mentorship sessions
- Track upcoming/previous sessions

### 4. **Training** (`/training`)
- Browse training programs
- Enroll in courses
- Track progress
- View certificates

### 5. **Funding** (`/funding`)
- Submit funding applications
- Upload pitch deck & documents
- Track application status
- Receive status updates

### 6. **Events** (`/events`)
- View upcoming events/webinars
- Register for events
- See speaker information
- Track registrations

### 7. **Community** (`/community`)
- Read discussion forum posts
- Ask questions
- Reply to posts
- Network with other entrepreneurs

### 8. **Resources** (`/resources`)
- Access business guides
- Download templates
- Watch training videos
- Learn best practices

---

## 🔌 API Integration Points

### Authentication Endpoints
```
POST   /api/auth/register           → Register new user
POST   /api/auth/login              → Login user
POST   /api/auth/forgot-password    → Reset password
```

### Dashboard Endpoints
```
GET    /api/analytics/dashboard     → Get dashboard data
```

### Profile Endpoints
```
GET    /api/profile                 → Get user profile
PUT    /api/profile                 → Update profile
```

### Mentorship Endpoints
```
GET    /api/mentorship/mentors      → Get available mentors
POST   /api/mentorship/request      → Request mentorship
PUT    /api/mentorship/request/:id  → Update request status
```

### Training Endpoints
```
GET    /api/training                → Get programs
POST   /api/training/:id/enroll     → Enroll in program
POST   /api/training                → Create program (admin)
```

### Funding Endpoints
```
GET    /api/funding                 → Get applications
POST   /api/funding                 → Submit application
PUT    /api/funding/:id             → Update status
```

### Events Endpoints
```
GET    /api/events                  → Get events
POST   /api/events/:id/register     → Register for event
POST   /api/events                  → Create event (admin)
```

### Community Endpoints
```
GET    /api/community/posts         → Get posts
POST   /api/community/posts         → Create post
POST   /api/community/posts/:id/reply → Reply to post
GET    /api/community/groups        → Get networking groups (static list)
```

### Notifications Endpoints
```
GET    /api/notifications           → Get notifications
PUT    /api/notifications/:id/read  → Mark as read
```

---

## 🧪 Testing Features

### Test Creating a Profile
1. Login/Register
2. Go to Profile
3. Fill in business details
4. Click Save
5. ✅ Profile saved (see success message)

### Test Mentorship Request
1. Go to Mentorship
2. Browse mentors (may be empty initially)
3. Create test mentor in database (or admin panel)
4. Click "Request Mentorship"
5. ✅ Request sent (see confirmation)

### Test Creating a Post
1. Go to Community
2. Type a question in the text area
3. Click "Ask Question"
4. ✅ Post appears in list
5. Click "Reply" to add response

### Test Event Registration
1. Go to Events
2. Click "Register" on any event
3. ✅ See success message

### Test Notifications
1. Click bell icon (🔔) in Navbar
2. ✅ See notification list

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check MongoDB connection string in .env
# Verify internet connection (for MongoDB Atlas)
# Try: npm install again
# Check if port 5000 is already in use
```

### Frontend Can't Connect to Backend
```bash
# Verify backend is running on :5000
# Check browser console (F12) for errors
# Ensure API base URL is: http://localhost:5000/api
# Check CORS settings in backend
```

### Port Already in Use
```bash
# For backend (port 5000):
# - Change PORT in .env file
# - Or: kill process using port 5000

# For frontend (port 5173):
# - Vite will automatically use next available port
# - Or: manually specify in vite.config.js
```

### Login/Register Fails
```
❌ User already exists
→ Use different email

❌ Invalid email or password
→ Check credentials, ensure user exists

❌ Connection refused
→ Verify backend is running
```

### Notifications Not Showing
```bash
# Backend may need to send notifications
# Check browser console for API errors
# Verify /api/notifications endpoint works
```

---

## 📁 Project Structure

```
Women-Entrepreneur-Support-Platform/
│
├── frontend/                 ← React + Vite app
│   ├── src/
│   │   ├── pages/           ← All page components
│   │   ├── components/      ← Shared components
│   │   ├── services/        ← API client (api.js)
│   │   ├── store/           ← Zustand auth store
│   │   ├── App.jsx          ← Main app component
│   │   └── AppRouter.jsx    ← Route definitions
│   ├── package.json
│   └── vite.config.js
│
└── backend/                  ← Node.js + Express API
    ├── controllers/         ← Request handlers
    ├── models/              ← MongoDB schemas
    ├── routes/              ← API endpoints
    ├── middleware/          ← Auth middleware
    ├── utils/               ← Helper functions
    ├── server.js            ← Express setup
    └── package.json
```

---

## 🎯 User Roles & Capabilities

### Entrepreneur
- Create business profile
- Request mentorship
- Apply for funding
- Enroll in training
- Attend events
- Participate in community

### Mentor
- Build mentor profile (auto-created)
- Accept mentorship requests
- Conduct sessions
- Provide guidance

### Investor
- Review funding applications
- Approve/reject applications
- Track opportunities

---

## 🔐 Security Features

- ✅ Password hashing (bcrypt)
- ✅ JWT authentication (30-day expiration)
- ✅ Protected routes
- ✅ Role-based access control
- ✅ Input validation
- ✅ Error handling

---

## 📞 Common Commands

### Backend
```bash
cd backend
npm install    # Install dependencies
npm start      # Start server (production)
npm run dev    # Start with auto-reload (requires nodemon)
```

### Frontend
```bash
cd frontend
npm install    # Install dependencies
npm run dev    # Start dev server
npm run build  # Build for production
npm preview    # Preview production build
```

---

## ✅ Checklist Before Deployment

- [ ] Backend running on localhost:5000
- [ ] Frontend running on localhost:5173
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Dashboard displays data
- [ ] All pages load without errors
- [ ] API calls work (check Network tab in DevTools)
- [ ] Notifications appear in Navbar
- [ ] Community forum works
- [ ] Mentorship requests send notifications

---

## 📚 Documentation Files

Read these for more details:
- **QUICK_START.md** - Quick setup guide
- **INTEGRATION_COMPLETE.md** - Full integration details
- **backend/API_DOCUMENTATION.md** - API endpoint reference
- **backend/COMPLETION_SUMMARY.md** - Backend features summary

---

## 🚀 Ready to Go!

Your Women Entrepreneur Support Platform is now fully set up and integrated. 

**Next Steps:**
1. Start both servers ✅
2. Register a test account ✅
3. Explore all features ✅
4. Test API integrations ✅
5. Deploy when ready ✅

---

**Happy Building! 💪👩‍💼🚀**
