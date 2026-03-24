const EntrepreneurProfile = require('../models/EntrepreneurProfile');
const Mentor = require('../models/Mentor');
const User = require('../models/User');
const TrainingProgram = require('../models/TrainingProgram');
const Resource = require('../models/Resource');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    let profile = null;
    let completionScore = 0;

    if (user.role === 'entrepreneur') {
      profile = await EntrepreneurProfile.findOne({ userId: req.user.id });
      
      if (profile) {
        // Calculate Completeness Score
        const fields = ['businessName', 'industry', 'stage', 'fundingRequired', 'website', 'location', 'description', 'documents'];
        let filledCount = 0;
        fields.forEach(f => {
          if (profile[f] && profile[f].toString().trim() !== '' && (Array.isArray(profile[f]) ? profile[f].length > 0 : true)) {
            filledCount++;
          }
        });
        completionScore = Math.round((filledCount / fields.length) * 100);
      }
    } else if (user.role === 'mentor') {
      profile = await Mentor.findOne({ userId: req.user.id });
    }

    res.status(200).json({ user, profile, completionScore });
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
      const { businessName, industry, stage, fundingRequired, website, location, description } = req.body;
      if (businessName !== undefined) profile.businessName = businessName;
      if (industry !== undefined) profile.industry = industry;
      if (stage !== undefined) profile.stage = stage;
      if (fundingRequired !== undefined) profile.fundingRequired = fundingRequired;
      if (website !== undefined) profile.website = website;
      if (location !== undefined) profile.location = location;
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

// @desc    Get matching recommendations for entrepreneur
// @route   GET /api/profile/recommendations
// @access  Private
const getRecommendations = async (req, res) => {
  try {
    if (req.user.role !== 'entrepreneur') {
      return res.status(403).json({ message: 'Only entrepreneurs can get recommendations' });
    }

    const profile = await EntrepreneurProfile.findOne({ userId: req.user.id });
    const industry = profile?.industry;

    let recommendedTrainings = [];
    let recommendedResources = [];

    if (industry) {
      const regex = new RegExp(industry, 'i');
      
      recommendedTrainings = await TrainingProgram.find({
        $or: [{ title: regex }, { description: regex }]
      }).limit(3);

      recommendedResources = await Resource.find({
        $or: [{ title: regex }, { description: regex }, { category: regex }]
      }).limit(4);
    } else {
      // Fallback if no industry is defined
      recommendedTrainings = await TrainingProgram.find().limit(2);
      recommendedResources = await Resource.find().limit(3);
    }

    res.status(200).json({ recommendedTrainings, recommendedResources });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getRecommendations
};
