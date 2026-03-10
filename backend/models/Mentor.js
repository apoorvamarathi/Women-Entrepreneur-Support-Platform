const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  industryExpertise: [String],

  experience: Number,

  availability: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Mentor", mentorSchema);
