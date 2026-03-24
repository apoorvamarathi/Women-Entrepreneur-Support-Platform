const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["guides", "templates", "videos", "schemes"],
    required: true
  },
  type: {
    type: String,
    enum: ["view", "download"],
    required: true
  },
  link: String,
  fileUrl: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Resource", resourceSchema);
