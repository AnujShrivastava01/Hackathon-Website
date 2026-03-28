const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  venue: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  registrationLink: { type: String, default: "https://forms.gle/hnMMFzu25AyTywS49" },
  socialLinks: {
    twitter: String,
    linkedin: String,
    instagram: String,
    github: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
