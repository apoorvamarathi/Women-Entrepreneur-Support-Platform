const FundingApplication = require('../models/FundingApplication');
const { createNotification } = require('../utils/notificationHelper');

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

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Valid funding amount is required' });
    }

    if (req.user.role !== 'entrepreneur') {
      return res.status(403).json({ message: 'Only entrepreneurs can apply for funding' });
    }

    const application = await FundingApplication.create({
      entrepreneurId: req.user.id,
      amount,
      pitchDeck
    });

    // Send notification to entrepreneur
    await createNotification(req.user.id, `Your funding application for $${amount} has been submitted. We'll review it shortly!`);

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

    // Validation
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Valid status is required' });
    }

    if (req.user.role !== 'investor' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update application status' });
    }

    const application = await FundingApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    const updatedApplication = await application.save();

    // Send notification to entrepreneur about status change
    const statusMessage = status === 'approved' ? 'approved! Congratulations!' : `${status}. Better luck next time!`;
    await createNotification(application.entrepreneurId, `Your funding application has been ${statusMessage}`);

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
