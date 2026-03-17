const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error: ', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/mentorship', require('./routes/mentorshipRoutes'));
app.use('/api/training', require('./routes/trainingRoutes'));
app.use('/api/funding', require('./routes/fundingRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
