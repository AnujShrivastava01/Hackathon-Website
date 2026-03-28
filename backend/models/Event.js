const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  venue: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  registrationLink: { type: String, default: "https://docs.google.com/forms/d/e/1FAIpQLSdO7N7vXy7v3z_XhA/viewform" },
  socialLinks: {
    twitter: String,
    linkedin: String,
    instagram: String,
    github: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
