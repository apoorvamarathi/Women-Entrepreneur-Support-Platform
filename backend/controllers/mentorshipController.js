const MentorshipRequest = require('../models/MentorshipRequest');
const Mentor = require('../models/Mentor');
const User = require('../models/User');
const { createNotification } = require('../utils/notificationHelper');

// @desc    Get all available mentors
// @route   GET /api/mentorship/mentors
// @access  Private
const getMentors = async (req, res) => {
  try {
    // Populate user details for each mentor
    const mentors = await Mentor.find({ availability: true }).populate('userId', 'name email');
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a mentorship request
// @route   POST /api/mentorship/request
// @access  Private
const createMentorshipRequest = async (req, res) => {
  try {
    const { mentorId, sessionDate } = req.body;

    // Validation
    if (!mentorId || !sessionDate) {
      return res.status(400).json({ message: 'Mentor ID and session date are required' });
    }

    // Check if user is an entrepreneur
    if (req.user.role !== 'entrepreneur') {
      return res.status(403).json({ message: 'Only entrepreneurs can request mentorship' });
    }

    // Check if mentor exists
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    const request = await MentorshipRequest.create({
      entrepreneurId: req.user.id,
      mentorId,
      sessionDate
    });

    // Send notification to mentor
    await createNotification(mentor.userId, `${req.user.name} has requested mentorship for ${new Date(sessionDate).toLocaleDateString()}`);

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update mentorship request status
// @route   PUT /api/mentorship/request/:id
// @access  Private
const updateMentorshipRequest = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await MentorshipRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Check if the current user is the mentor for this request
    if (request.mentorId.toString() !== req.user.id) {
       return res.status(401).json({ message: 'User not authorized to update this request' });
    }

    request.status = status;
    const updatedRequest = await request.save();

    res.status(200).json(updatedRequest);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get sessions for the current user (upcoming and previous)
// @route   GET /api/mentorship/sessions
// @access  Private
const getUserSessions = async (req, res) => {
  try {
    const userId = req.user.id;
    // Find requests where user is either entrepreneur or mentor
    const requests = await MentorshipRequest.find({
      $or: [{ entrepreneurId: userId }, { mentorId: userId }]
    }).populate('mentorId', 'userId').populate('entrepreneurId', 'userId');

    const now = new Date();
    const upcoming = [];
    const previous = [];

    requests.forEach(reqDoc => {
      const sessionObj = {
        id: reqDoc._id,
        mentor:
          reqDoc.mentorId?.userId?.name ||
          (reqDoc.mentorId ? 'Unknown Mentor' : ''),
        time: reqDoc.sessionDate,
        status: reqDoc.status,
        notes: reqDoc.notes || ''
      };

      if (new Date(reqDoc.sessionDate) >= now && reqDoc.status !== 'Completed') {
        upcoming.push(sessionObj);
      } else {
        previous.push(sessionObj);
      }
    });

    res.status(200).json({ upcoming, previous });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMentors,
  createMentorshipRequest,
  updateMentorshipRequest,
  getUserSessions
};
