const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  day: { type: Number, required: true }, // 1, 2, ...
  phase: { type: String, required: true }, // Pre-Hack, Day 1, Day 2....
  color: { type: String, default: "primary" } // For styling
}, { timestamps: true });

module.exports = mongoose.model('Agenda', agendaSchema);
