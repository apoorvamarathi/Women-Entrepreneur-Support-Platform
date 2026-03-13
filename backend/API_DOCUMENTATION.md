# Women Entrepreneur Support Platform - Backend API Documentation

## Overview
The backend is built with Node.js, Express, and MongoDB. It provides RESTful API endpoints for user authentication, profile management, mentorship, training, funding applications, events, and community features.

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- npm

### Installation
```bash
cd backend
npm install
```

### Configuration
Create a `.env` file with:
```env
MONGO_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_jwt_secret
```

### Running the Server
```bash
npm start      # production
npm run dev    # development with nodemon
```

---

## API Endpoints

### Authentication (`/api/auth`)

#### Register User
```
POST /api/auth/register
Body: { name, email, password, role }
Response: { _id, name, email, role, token }
```
- Creates user account
- Auto-creates Mentor or EntrepreneurProfile based on role
- Returns JWT token

#### Login
```
POST /api/auth/login
Body: { email, password }
Response: { _id, name, email, role, token }
```

#### Forgot Password
```
POST /api/auth/forgot-password
Body: { email }
Response: { message }
```
- Returns success message for any email (security feature)

---

### Profile (`/api/profile`)

#### Get Profile
```
GET /api/profile
Headers: { Authorization: Bearer <token> }
Response: { user, profile }
```
- Returns user info + role-specific profile (EntrepreneurProfile or Mentor)

#### Update Profile
```
PUT /api/profile
Headers: { Authorization: Bearer <token> }
Body: { businessName, industry, stage, fundingRequired, website, description }
       OR { industryExpertise, experience, availability }
Response: Updated profile object
```

---

### Mentorship (`/api/mentorship`)

#### Get Available Mentors
```
GET /api/mentorship/mentors
Headers: { Authorization: Bearer <token> }
Response: [{ userId, industryExpertise, experience, availability }]
```
- Returns mentors with availability: true

#### Request Mentorship
```
POST /api/mentorship/request
Headers: { Authorization: Bearer <token> }
Body: { mentorId, sessionDate }
Response: { entrepreneurId, mentorId, status, sessionDate }
```
- Only entrepreneurs can request
- Sends notification to mentor

#### Update Mentorship Request Status
```
PUT /api/mentorship/request/:id
Headers: { Authorization: Bearer <token> }
Body: { status }  // "pending", "accepted", "rejected", "completed"
Response: Updated request object
```

---

### Training (`/api/training`)

#### Get Training Programs
```
GET /api/training
Headers: { Authorization: Bearer <token> }
Response: [{ id, title, description, trainer, duration, schedule, enrolled, completed, certificate }]
```

#### Create Training Program
```
POST /api/training
Headers: { Authorization: Bearer <token> }
Body: { title, description, trainer, duration, schedule }
Response: Created program object
```

#### Enroll in Program
```
POST /api/training/:id/enroll
Headers: { Authorization: Bearer <token> }
Response: { userId, programId, completed, certificateUrl }
```

---

### Funding (`/api/funding`)

#### Get Funding Applications
```
GET /api/funding
Headers: { Authorization: Bearer <token> }
Response: [{ entrepreneurId, amount, pitchDeck, status, createdAt }]
```

#### Create Funding Application
```
POST /api/funding
Headers: { Authorization: Bearer <token> }
Body: { amount, pitchDeck }
Response: Created application object
```
- Only entrepreneurs can apply
- Sends confirmation notification

#### Update Funding Application Status
```
PUT /api/funding/:id
Headers: { Authorization: Bearer <token> }
Body: { status }  // "pending", "approved", "rejected"
Response: Updated application object
```
- Sends notification to entrepreneur about decision

---

### Events (`/api/events`)

#### Get Events
```
GET /api/events
Headers: { Authorization: Bearer <token> }
Response: [{ id, title, description, date, time, speaker }]
```

#### Create Event
```
POST /api/events
Headers: { Authorization: Bearer <token> }
Body: { title, description, date, time, speaker }
Response: Created event object
```

#### Register for Event
```
POST /api/events/:id/register
Headers: { Authorization: Bearer <token> }
Response: { message, event }
```

---

### Community (`/api/community`)

#### Get Community Posts
```
GET /api/community/posts
Headers: { Authorization: Bearer <token> }
Response: [{ id, user, text, replies: [{ userId, text, createdAt }], repliesCount, time }]
```

#### Create Post
```
POST /api/community/posts
Headers: { Authorization: Bearer <token> }
Body: { text }
Response: { id, user, text, replies, repliesCount, time }
```

#### Reply to Post
```
POST /api/community/posts/:id/reply
Headers: { Authorization: Bearer <token> }
Body: { text }
Response: { id, replies, repliesCount }
```

#### Get Networking Groups
```
GET /api/community/groups
Headers: { Authorization: Bearer <token> }
Response: [{ id, name, members, description }]
```

---

### Notifications (`/api/notifications`)

#### Get Notifications
```
GET /api/notifications
Headers: { Authorization: Bearer <token> }
Response: [{ userId, message, status, createdAt }]
```

#### Mark Notification as Read
```
PUT /api/notifications/:id/read
Headers: { Authorization: Bearer <token> }
Response: Updated notification object
```

---

### Analytics (`/api/analytics`)

#### Get Dashboard Analytics
```
GET /api/analytics/dashboard
Headers: { Authorization: Bearer <token> }
Response: {
  stats: { totalEntrepreneurs, totalMentors, totalFundingRequests, totalTrainingPrograms, ... },
  charts: { userGrowthData, fundingTrendsData }
}
```

---

## Database Models

### User
- name, email, password (hashed), role (entrepreneur/mentor/investor)

### EntrepreneurProfile
- userId, businessName, industry, stage, fundingRequired, website, description, documents

### Mentor
- userId, industryExpertise, experience, availability

### MentorshipRequest
- entrepreneurId, mentorId, status, sessionDate

### TrainingProgram
- title, description, trainer, duration, schedule

### TrainingEnrollment
- userId, programId, completed, certificateUrl

### FundingApplication
- entrepreneurId, amount, pitchDeck, status

### Event
- title, description, date, time, speaker, registeredUsers

### ForumPost
- userId, text, replies: [{ userId, text, createdAt }], repliesInfo

### Notification
- userId, message, status

---

## Error Handling

All endpoints return standardized error responses:
```json
{
  "message": "Error description"
}
```

Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 401: Unauthorized (no token or invalid token)
- 403: Forbidden (not authorized for action)
- 404: Not Found
- 500: Server Error

---

## Authentication

All protected endpoints require:
```
Authorization: Bearer <JWT_TOKEN>
```

Token is obtained from `/auth/login` or `/auth/register` and expires in 30 days.

---

## Key Features Implemented

✅ User Authentication (Register, Login, Forgot Password)
✅ Role-based Access Control (entrepreneur, mentor, investor)
✅ Profile Management  
✅ Mentorship Request System with Notifications
✅ Training Program Enrollment
✅ Funding Application Management
✅ Event Management & Registration
✅ Community Forum with Replies
✅ Notification System
✅ Dashboard Analytics
✅ Input Validation
✅ Error Handling

---

## Future Enhancements

- Email verification
- Password reset token implementation
- File upload (S3 integration)
- Real-time notifications (Socket.io)
- Admin dashboard
- User role management
- Advanced filtering and search
- Pagination
- Rate limiting
