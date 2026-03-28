const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  time: { type: String, required: true }, // "09:00 AM"
  activity: { type: String, required: true },
  description: { type: String },
  day: { type: Number, required: true } // 1, 2, ...
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
