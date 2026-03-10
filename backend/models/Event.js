const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: String,

  date: Date,

  speaker: String

}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
