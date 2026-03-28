const Schedule = require('../models/Schedule');

const DEFAULT_SCHEDULE = [
  {
    time: '09:00 AM',
    activity: 'Hackathon kick-off',
    description: 'Opening, rules, and challenge reveal. The clock starts.',
    day: 1,
  },
  {
    time: '11:00 AM',
    activity: 'Team ideation & design',
    description: 'Roadmaps, sketches, and first commits with mentor office hours.',
    day: 1,
  },
  {
    time: '01:00 PM',
    activity: 'Technical mentorship',
    description: 'Architecture reviews and debugging blocks with domain experts.',
    day: 1,
  },
  {
    time: '02:00 PM',
    activity: 'Mid-hack check-in',
    description: 'Progress share, scope trimming, and early prototype feedback.',
    day: 2,
  },
  {
    time: '08:00 PM',
    activity: 'Final submission',
    description: 'Repos tagged, demos recorded, and submissions locked.',
    day: 3,
  },
];

const getSchedule = async (req, res) => {
  try {
    let schedule = await Schedule.find().sort({ day: 1, createdAt: 1 });
    if (schedule.length === 0) {
      await Schedule.insertMany(DEFAULT_SCHEDULE);
      schedule = await Schedule.find().sort({ day: 1, createdAt: 1 });
    }
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createSchedule = async (req, res) => {
  try {
    const newSchedule = await Schedule.create(req.body);
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSchedule);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: 'Schedule item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getSchedule, createSchedule, updateSchedule, deleteSchedule };
