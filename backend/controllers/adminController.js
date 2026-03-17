const User = require('../models/User');
const Report = require('../models/Report');
const FundingApplication = require('../models/FundingApplication'); // if exists
const TrainingProgram = require('../models/TrainingProgram'); // if exists
const MentorshipRequest = require('../models/MentorshipRequest');
// @desc    Get all users with optional filters
// @route   GET /api/admin/users
// @access  Admin
const getUsers = async (req, res) => {
  try {
    const { role, status } = req.query;
    let filter = {};
    if (role) filter.role = role;
    if (status) filter.status = status;

    const users = await User.find(filter).select('-password').sort('-createdAt');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve a pending user (set status to active)
// @route   PUT /api/admin/users/:id/approve
// @access  Admin
const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.status = 'active';
    await user.save();

    res.json({ success: true, message: 'User approved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reject a user (set status to inactive)
// @route   PUT /api/admin/users/:id/reject
// @access  Admin
const rejectUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.status = 'inactive';
    await user.save();

    res.json({ success: true, message: 'User rejected' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all reports
// @route   GET /api/admin/reports
// @access  Admin
const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort('-createdAt').populate('generatedBy', 'name');
    res.json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Generate a new report (placeholder – implement actual logic)
// @route   POST /api/admin/reports/generate
// @access  Admin
const generateReport = async (req, res) => {
  try {
    const { name, type } = req.body;
    // In real app, you'd generate PDF/Excel and save file, then create record
    const report = await Report.create({
      name,
      type,
      generatedBy: req.user.id,
      url: '#', // placeholder
    });

    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get admin dashboard analytics (total users, pending approvals, etc.)
// @route   GET /api/admin/analytics
// @access  Admin
const getDashboardAnalytics = async (req, res) => {
  try {
    const totalEntrepreneurs = await User.countDocuments({ role: 'entrepreneur' });
    const totalMentors = await User.countDocuments({ role: 'mentor' });
    const totalInvestors = await User.countDocuments({ role: 'investor' });
    const pendingApprovals = await User.countDocuments({ status: 'pending' });
    
    // Assuming you have these collections:
    const totalFundingRequests = await FundingApplication?.countDocuments() || 0;
    const pendingFundingReviews = await FundingApplication?.countDocuments({ status: 'pending' }) || 0;
    const totalTrainingPrograms = await TrainingProgram?.countDocuments() || 0;
    const pendingMentorshipRequests = await MentorshipRequest?.countDocuments({ status: 'pending' }) || 0;

    // User growth over last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          entrepreneurs: {
            $sum: { $cond: [{ $eq: ['$role', 'entrepreneur'] }, 1, 0] }
          },
          mentors: {
            $sum: { $cond: [{ $eq: ['$role', 'mentor'] }, 1, 0] }
          }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Funding trends (mock for now, adjust based on your data)
    const fundingTrends = await FundingApplication?.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]) || [];

    res.json({
      success: true,
      data: {
        stats: {
          totalEntrepreneurs,
          totalMentors,
          totalInvestors,
          totalFundingRequests,
          totalTrainingPrograms,
          pendingApprovals,
          pendingFundingReviews,
          pendingMentorshipRequests,
        },
        charts: {
          userGrowthData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Entrepreneurs',
                data: userGrowth.map(item => item.entrepreneurs),
                backgroundColor: '#6C63FF',
              },
              {
                label: 'Mentors',
                data: userGrowth.map(item => item.mentors),
                backgroundColor: '#FF9F43',
              },
            ],
          },
          fundingTrendsData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Funding Applications',
                data: fundingTrends.map(item => item.count),
                borderColor: '#28C76F',
                backgroundColor: 'rgba(40,199,111,0.1)',
                tension: 0.4,
              },
            ],
          },
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getUsers,
  approveUser,
  rejectUser,
  getReports,
  generateReport,
  getDashboardAnalytics,
};