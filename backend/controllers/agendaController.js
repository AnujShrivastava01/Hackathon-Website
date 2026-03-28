const Agenda = require('../models/Agenda');

const getAgenda = async (req, res) => {
  try {
    const agenda = await Agenda.find().sort('day');
    res.json(agenda);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createAgenda = async (req, res) => {
  try {
    const newAgenda = await Agenda.create(req.body);
    res.status(201).json(newAgenda);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateAgenda = async (req, res) => {
  try {
    const updatedAgenda = await Agenda.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAgenda);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteAgenda = async (req, res) => {
  try {
    await Agenda.findByIdAndDelete(req.params.id);
    res.json({ message: 'Agenda item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAgenda, createAgenda, updateAgenda, deleteAgenda };
