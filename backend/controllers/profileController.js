const EntrepreneurProfile = require('../models/EntrepreneurProfile');
const Mentor = require('../models/Mentor');
const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    let profile = null;

    if (user.role === 'entrepreneur') {
      profile = await EntrepreneurProfile.findOne({ userId: req.user.id });
    } else if (user.role === 'mentor') {
      profile = await Mentor.findOne({ userId: req.user.id });
    }

    res.status(200).json({ user, profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const userRole = req.user.role;
    let updatedProfile = null;

    if (userRole === 'entrepreneur') {
      let profile = await EntrepreneurProfile.findOne({ userId: req.user.id });
      
      if (!profile) {
        profile = new EntrepreneurProfile({ userId: req.user.id });
      }

      // Update fields explicitly or spread req.body
      const { businessName, industry, stage, fundingRequired, website, description } = req.body;
      if (businessName !== undefined) profile.businessName = businessName;
      if (industry !== undefined) profile.industry = industry;
      if (stage !== undefined) profile.stage = stage;
      if (fundingRequired !== undefined) profile.fundingRequired = fundingRequired;
      if (website !== undefined) profile.website = website;
      if (description !== undefined) profile.description = description;

      updatedProfile = await profile.save();
      
    } else if (userRole === 'mentor') {
      let profile = await Mentor.findOne({ userId: req.user.id });
      
      if (!profile) {
        profile = new Mentor({ userId: req.user.id });
      }

      const { industryExpertise, experience, availability } = req.body;
      if (industryExpertise !== undefined) profile.industryExpertise = industryExpertise;
      if (experience !== undefined) profile.experience = experience;
      if (availability !== undefined) profile.availability = availability;

      updatedProfile = await profile.save();
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
