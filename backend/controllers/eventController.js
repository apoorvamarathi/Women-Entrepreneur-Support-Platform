const Event = require('../models/Event');

// @desc    Get all upcoming events
// @route   GET /api/events
// @access  Private
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Admin role typically)
const createEvent = async (req, res) => {
  try {
    const { title, description, date, speaker } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      speaker
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEvents,
  createEvent
};
