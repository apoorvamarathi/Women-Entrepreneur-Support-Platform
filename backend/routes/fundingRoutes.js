const express = require('express');
const router = express.Router();
const { getFundingApplications, createFundingApplication, updateFundingApplication } = require('../controllers/fundingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getFundingApplications);
router.post('/', protect, createFundingApplication);
router.put('/:id', protect, updateFundingApplication);

module.exports = router;
