const express = require('express');
const router = express.Router();
const { getEvents, createEvent, registerForEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getEvents);
router.post('/', protect, createEvent);
router.post('/:id/register', protect, registerForEvent);

module.exports = router;
