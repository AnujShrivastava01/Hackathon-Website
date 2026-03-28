const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  isOpen: { type: Boolean, default: false } // Default state
}, { timestamps: true });

module.exports = mongoose.model('FAQ', faqSchema);
