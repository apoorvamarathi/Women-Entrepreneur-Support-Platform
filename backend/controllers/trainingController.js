const TrainingProgram = require('../models/TrainingProgram');
const TrainingEnrollment = require('../models/TrainingEnrollment');
const User = require('../models/User');
const { sendEmail } = require('../utils/emailService');

// @desc    Get all training programs and user enrollments
// @route   GET /api/training
// @access  Private
const getTrainingPrograms = async (req, res) => {
  try {
    const programs = await TrainingProgram.find();
    
    // Also fetch the current user's enrollments
    const enrollments = await TrainingEnrollment.find({ userId: req.user.id });
    
    // Map enrollments to programs
    const programsWithEnrollment = programs.map(program => {
      const enrollment = enrollments.find(e => e.programId.toString() === program._id.toString());
      return {
        id: program._id,
        title: program.title,
        description: program.description,
        trainer: program.trainer,
        duration: program.duration,
        schedule: new Date(program.schedule).toLocaleDateString() || program.schedule,
        enrolled: !!enrollment,
        completed: enrollment ? enrollment.completed : false,
        certificate: enrollment ? enrollment.certificateUrl : null
      };
    });

    res.status(200).json(programsWithEnrollment);
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

    // Validation
    if (!title || !trainer || !duration) {
      return res.status(400).json({ message: 'Title, trainer, and duration are required' });
    }

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

// @desc    Enroll in a training program
// @route   POST /api/training/:id/enroll
// @access  Private
const enrollInProgram = async (req, res) => {
  try {
    const programId = req.params.id;
    
    // Check if program exists
    const program = await TrainingProgram.findById(programId);
    if (!program) {
      return res.status(404).json({ message: 'Training program not found' });
    }

    const enrollment = await TrainingEnrollment.create({
      userId: req.user.id,
      programId
    });

    const user = await User.findById(req.user.id);

    // Send Enrollment Confirmation Email
    if (user) {
      await sendEmail({
        to: user.email,
        subject: `Enrollment Confirmed: ${program.title}`,
        html: `<h2>You are enrolled!</h2>
               <p>Hi ${user.name}, you have successfully enrolled in <strong>${program.title}</strong>.</p>
               <p>Trainer: ${program.trainer}<br/>
               Duration: ${program.duration}<br/>
               Schedule: ${new Date(program.schedule).toLocaleDateString()}</p>
               <p>Get ready to learn and grow!</p>`
      });
    }

    res.status(201).json(enrollment);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Already enrolled in this program' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTrainingPrograms,
  createTrainingProgram,
  enrollInProgram
};
