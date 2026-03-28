const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Track', trackSchema);
