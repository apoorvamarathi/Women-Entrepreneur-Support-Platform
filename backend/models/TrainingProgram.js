const mongoose = require("mongoose");

const trainingProgramSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: String,

  trainer: String,

  duration: String,

  schedule: Date

}, { timestamps: true });

module.exports = mongoose.model("TrainingProgram", trainingProgramSchema);
