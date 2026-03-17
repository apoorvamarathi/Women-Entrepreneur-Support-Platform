const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['PDF', 'Excel'], default: 'PDF' },
  url: String,
  createdAt: { type: Date, default: Date.now },
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Report', ReportSchema);