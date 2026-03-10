const MentorshipRequest = require('../models/MentorshipRequest');
const Mentor = require('../models/Mentor');
const User = require('../models/User');

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

    // Check if user is an entrepreneur
    if (req.user.role !== 'entrepreneur') {
      return res.status(403).json({ message: 'Only entrepreneurs can request mentorship' });
    }

    const request = await MentorshipRequest.create({
      entrepreneurId: req.user.id,
      mentorId,
      sessionDate
    });

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

module.exports = {
  getMentors,
  createMentorshipRequest,
  updateMentorshipRequest
};
