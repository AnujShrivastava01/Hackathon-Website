const FAQ = require('../models/FAQ');

const DEFAULT_FAQS = [
  {
    question: 'Who can participate?',
    answer:
      'Students, professionals, designers, and curious builders. Solo or in teams (up to four) — we help match people on day one if needed.',
  },
  {
    question: 'What is the registration fee?',
    answer:
      'HackOcean is free to attend. Food, swag, and workspace access are covered by our partners.',
  },
  {
    question: 'How do I join a team?',
    answer:
      'List teammates when you register, or show up solo and join the team formation block at kick-off.',
  },
  {
    question: 'What should I bring?',
    answer:
      'Laptop, charger, and anything you need to stay comfortable for a long sprint. We provide Wi‑Fi, power, and caffeine diplomacy.',
  },
  {
    question: 'What if I have never hacked before?',
    answer:
      'That is the point. Workshops and mentors are there so your first ship happens in good company.',
  },
];

const getFAQs = async (req, res) => {
  try {
    let faqs = await FAQ.find().sort({ createdAt: 1 });
    if (faqs.length === 0) {
      await FAQ.insertMany(DEFAULT_FAQS);
      faqs = await FAQ.find().sort({ createdAt: 1 });
    }
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
