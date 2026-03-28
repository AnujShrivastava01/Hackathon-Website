const Schedule = require('../models/Schedule');

const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find().sort('day');
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
