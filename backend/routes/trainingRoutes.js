const express = require('express');
const router = express.Router();
const { getTrainingPrograms, createTrainingProgram, enrollInProgram } = require('../controllers/trainingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getTrainingPrograms);
router.post('/', protect, createTrainingProgram);
router.post('/:id/enroll', protect, enrollInProgram);

module.exports = router;
