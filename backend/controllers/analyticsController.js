const User = require('../models/User');
const FundingApplication = require('../models/FundingApplication');
const TrainingProgram = require('../models/TrainingProgram');
const MentorshipRequest = require('../models/MentorshipRequest');

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private
const getDashboardAnalytics = async (req, res) => {
  try {
    // Stat counts
    const totalEntrepreneurs = await User.countDocuments({ role: 'entrepreneur' });
    const totalMentors = await User.countDocuments({ role: 'mentor' });
    const totalFundingRequests = await FundingApplication.countDocuments();
    const totalTrainingPrograms = await TrainingProgram.countDocuments();

    // Admin Action counts
    const pendingMentorshipRequests = await MentorshipRequest.countDocuments({ status: 'pending' });
    const pendingFundingReviews = await FundingApplication.countDocuments({ status: 'pending' });
    // Assuming new users are all "approved" for now unless there's a status field, we'll just mock registration approvals to 0:
    const pendingApprovals = 0; 
    
    // Generate mock graph data for now since we don't have historical data
    // In a real application, you would aggregate by month using created_at
    const userGrowthData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Entrepreneurs",
          data: [65, 78, 90, 112, 135, totalEntrepreneurs > 150 ? totalEntrepreneurs : 150],
          backgroundColor: "#6C63FF",
          borderRadius: 8,
        },
        {
          label: "Mentors",
          data: [20, 25, 30, 35, 42, totalMentors > 48 ? totalMentors : 48],
          backgroundColor: "#FF9F43",
          borderRadius: 8,
        },
      ],
    };

    const fundingTrendsData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Funding Applications",
          data: [12, 19, 15, 22, 24, totalFundingRequests > 28 ? totalFundingRequests : 28],
          borderColor: "#28C76F",
          backgroundColor: "rgba(40, 199, 111, 0.1)",
          tension: 0.4,
        },
      ],
    };

    res.json({
      stats: {
        totalEntrepreneurs,
        totalMentors,
        totalFundingRequests,
        totalTrainingPrograms,
        pendingMentorshipRequests,
        pendingFundingReviews,
        pendingApprovals
      },
      charts: {
        userGrowthData,
        fundingTrendsData
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving analytics' });
  }
};

module.exports = {
  getDashboardAnalytics,
};
