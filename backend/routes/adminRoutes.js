const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getUsers,
  approveUser,
  rejectUser,
  getReports,
  generateReport,
  getDashboardAnalytics
} = require('../controllers/adminController');

// All routes require admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getUsers);
router.put('/users/:id/approve', approveUser);
router.put('/users/:id/reject', rejectUser);
router.get('/reports', getReports);
router.post('/reports/generate', generateReport);
router.get('/analytics', getDashboardAnalytics);

module.exports = router;