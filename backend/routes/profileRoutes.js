const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getRecommendations } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getProfile);
router.get('/recommendations', protect, getRecommendations);
router.put('/', protect, updateProfile);

module.exports = router;
