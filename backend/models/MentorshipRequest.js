const mongoose = require("mongoose");

const mentorshipRequestSchema = new mongoose.Schema({

  entrepreneurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending"
  },

  sessionDate: Date,

  notes: {
    type: String,
    default: ""
  }

}, { timestamps: true });

module.exports = mongoose.model("MentorshipRequest", mentorshipRequestSchema);
