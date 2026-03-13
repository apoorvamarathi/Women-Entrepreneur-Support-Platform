const Event = require('../models/Event');

// @desc    Get all upcoming events
// @route   GET /api/events
// @access  Private
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 })
      .select('_id title description date time speaker');
    
    // Map for frontend
    const mappedEvents = events.map(event => ({
      id: event._id,
      title: event.title,
      description: event.description,
      date: event.date ? new Date(event.date).toLocaleDateString() : '',
      time: event.time || '',
      speaker: event.speaker
    }));
    
    res.status(200).json(mappedEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Admin role typically)
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, speaker } = req.body;

    // Validation
    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      speaker
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register user for an event
// @route   POST /api/events/:id/register
// @access  Private
const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already registered
    if (event.registeredUsers.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    event.registeredUsers.push(req.user.id);
    await event.save();

    res.status(200).json({ message: 'Successfully registered for event', event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEvents,
  createEvent,
  registerForEvent
};
