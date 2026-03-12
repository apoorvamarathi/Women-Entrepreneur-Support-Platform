const mongoose = require("mongoose");

const trainingEnrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TrainingProgram",
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  certificateUrl: {
    type: String,
    default: null
  }
}, { timestamps: true });

// Ensure a user can only enroll in a program once
trainingEnrollmentSchema.index({ userId: 1, programId: 1 }, { unique: true });

module.exports = mongoose.model("TrainingEnrollment", trainingEnrollmentSchema);
