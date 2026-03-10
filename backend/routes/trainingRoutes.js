const express = require('express');
const router = express.Router();
const { getTrainingPrograms, createTrainingProgram } = require('../controllers/trainingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getTrainingPrograms);
// Normally you'd add admin/instructor role check middleware for the POST route
router.post('/', protect, createTrainingProgram);

module.exports = router;
