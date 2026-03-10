const TrainingProgram = require('../models/TrainingProgram');

// @desc    Get all training programs
// @route   GET /api/training
// @access  Private
const getTrainingPrograms = async (req, res) => {
  try {
    const programs = await TrainingProgram.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a training program (Admin or specific role)
// @route   POST /api/training
// @access  Private
const createTrainingProgram = async (req, res) => {
  try {
    const { title, description, trainer, duration, schedule } = req.body;

    const program = await TrainingProgram.create({
      title,
      description,
      trainer,
      duration,
      schedule
    });

    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTrainingPrograms,
  createTrainingProgram
};
