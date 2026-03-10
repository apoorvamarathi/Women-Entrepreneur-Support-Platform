const FundingApplication = require('../models/FundingApplication');

// @desc    Get all funding applications (for investors/admins)
// @route   GET /api/funding
// @access  Private
const getFundingApplications = async (req, res) => {
  try {
    // Basic implementation; you'd want to filter based on user role
    const applications = await FundingApplication.find().populate('entrepreneurId', 'name email');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a funding application
// @route   POST /api/funding
// @access  Private
const createFundingApplication = async (req, res) => {
  try {
    const { amount, pitchDeck } = req.body;

    if (req.user.role !== 'entrepreneur') {
      return res.status(403).json({ message: 'Only entrepreneurs can apply for funding' });
    }

    const application = await FundingApplication.create({
      entrepreneurId: req.user.id,
      amount,
      pitchDeck
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update funding application status
// @route   PUT /api/funding/:id
// @access  Private
const updateFundingApplication = async (req, res) => {
  try {
    const { status } = req.body;

    if (req.user.role !== 'investor' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update application status' });
    }

    const application = await FundingApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    const updatedApplication = await application.save();

    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFundingApplications,
  createFundingApplication,
  updateFundingApplication
};
