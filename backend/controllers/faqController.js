const FAQ = require('../models/FAQ');

const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createFAQ = async (req, res) => {
  try {
    const newFAQ = await FAQ.create(req.body);
    res.status(201).json(newFAQ);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateFAQ = async (req, res) => {
  try {
    const updatedFAQ = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFAQ);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteFAQ = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: 'FAQ item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getFAQs, createFAQ, updateFAQ, deleteFAQ };
