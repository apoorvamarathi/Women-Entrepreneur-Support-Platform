const mongoose = require("mongoose");

const entrepreneurProfileSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  businessName: String,

  industry: String,

  stage: {
    type: String,
    enum: ["idea", "startup", "growth", "established"]
  },

  fundingRequired: Number,

  website: String,

  location: String,

  description: String,

  documents: [
    {
      type: String
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("EntrepreneurProfile", entrepreneurProfileSchema);
