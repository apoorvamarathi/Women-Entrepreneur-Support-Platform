const FundingApplication = require('../models/FundingApplication');
const { createNotification } = require('../utils/notificationHelper');
const { sendEmail } = require('../utils/emailService');

// @desc    Get funding applications (filtered by role)
// @route   GET /api/funding
// @access  Private
const getFundingApplications = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'entrepreneur') {
      query.entrepreneurId = req.user.id;
    }
    
    const applications = await FundingApplication.find(query).populate('entrepreneurId', 'name email');
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

    // Send Investor Alert Email
    await sendEmail({
      to: 'investors@weplatform.com', // In a real app, query all users with role 'investor' and BCC them
      subject: `New Funding Application Alert: $${amount}`,
      html: `<h2>New Investment Opportunity!</h2>
             <p>A new funding application has been submitted by an entrepreneur.</p>
             <p><strong>Requested Amount:</strong> $${amount}</p>
             <p>Please log in to the platform to review their pitch deck and profile.</p>`
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
