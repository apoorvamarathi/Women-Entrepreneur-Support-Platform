const express = require('express');
const router = express.Router();
const { getMentors, createMentorshipRequest, updateMentorshipRequest, getUserSessions } = require('../controllers/mentorshipController');
const { protect } = require('../middleware/authMiddleware');

router.get('/mentors', protect, getMentors);
router.post('/request', protect, createMentorshipRequest);
router.put('/request/:id', protect, updateMentorshipRequest);
router.get('/sessions', protect, getUserSessions);

module.exports = router;
