const mongoose = require("mongoose");

const forumPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  repliesInfo: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("ForumPost", forumPostSchema);
