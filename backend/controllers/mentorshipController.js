const MentorshipRequest = require('../models/MentorshipRequest');
const Mentor = require('../models/Mentor');
const User = require('../models/User');
const EntrepreneurProfile = require('../models/EntrepreneurProfile');
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
    const { status, notes } = req.body;
    const request = await MentorshipRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Check if the current user is the mentor or entrepreneur 
    // Usually only mentors accept/reject, but notes could be added by mentors.
    if (request.mentorId.toString() !== req.user.id && request.entrepreneurId.toString() !== req.user.id) {
       return res.status(401).json({ message: 'User not authorized to update this request' });
    }

    if (status) request.status = status;
    if (notes !== undefined) request.notes = notes;
    
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
    }).populate('mentorId', 'name email').populate('entrepreneurId', 'name email');

    const now = new Date();
    const upcoming = [];
    const previous = [];

    requests.forEach(reqDoc => {
      // If the current user is the mentor, show the mentee's name. Otherwise, show the mentor's name.
      const isMentorUser = reqDoc.mentorId?._id?.toString() === userId || reqDoc.mentorId?.toString() === userId;
      
      const displayName = isMentorUser 
        ? (reqDoc.entrepreneurId?.name || 'Unknown Mentee')
        : (reqDoc.mentorId?.name || (reqDoc.mentorId ? 'Unknown Mentor' : 'Pending Mentor'));

      const sessionObj = {
        id: reqDoc._id,
        mentor: displayName,
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

// @desc    Auto match entrepreneur with best mentor
// @route   POST /api/mentorship/auto-match
// @access  Private
const autoMatchMentor = async (req, res) => {
  try {
    if (req.user.role !== 'entrepreneur') {
      return res.status(403).json({ message: 'Only entrepreneurs can auto-match' });
    }

    const profile = await EntrepreneurProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Entrepreneur profile not found' });
    }

    // Existing requests for this entrepreneur
    const existingRequests = await MentorshipRequest.find({ entrepreneurId: req.user.id });
    const matchedMentorUserIds = existingRequests.map(r => r.mentorId?.toString());

    // Get available mentors
    const availableMentors = await Mentor.find({ availability: true }).populate('userId', 'name email');
    
    if (availableMentors.length === 0) {
      return res.status(404).json({ message: 'No available mentors found' });
    }

    let bestMentor = null;
    let highestScore = -1;

    for (const mentor of availableMentors) {
      // Skip if already requested or matched
      if (matchedMentorUserIds.includes(mentor.userId?._id?.toString() || mentor.userId?.toString())) continue;

      let score = 0;

      // Scoring logic
      if (mentor.industryExpertise?.includes(profile.industry)) score += 5;
      if (mentor.preferredStages?.includes(profile.stage)) score += 3;
      if (mentor.location && profile.location && mentor.location.toLowerCase() === profile.location.toLowerCase()) score += 2;
      
      // +1 point per 2 years of experience
      if (mentor.experience) {
        score += Math.floor(mentor.experience / 2);
      }

      if (score > highestScore) {
        highestScore = score;
        bestMentor = mentor;
      }
    }

    if (!bestMentor) {
      return res.status(404).json({ message: 'Could not find a suitable unassigned mentor.' });
    }

    // Create request (pending for the mentor to accept)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const request = await MentorshipRequest.create({
      entrepreneurId: req.user.id,
      mentorId: bestMentor.userId,
      sessionDate: tomorrow.toISOString(),
      status: 'pending'
    });

    await createNotification(bestMentor.userId, `AUTO-MATCH: ${req.user.name} has been matched with you based on your profile compatibility.`);

    res.status(201).json({ mentor: bestMentor, request });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMentors,
  createMentorshipRequest,
  updateMentorshipRequest,
  getUserSessions,
  autoMatchMentor
};
