const Agenda = require('../models/Agenda');

const DEFAULT_AGENDA = [
  {
    day: 1,
    title: 'Concept & ideation',
    phase: 'Pre-hack',
    description:
      'Form teams, brainstorm, and define your MVP. Set up repos and environments.',
  },
  {
    day: 2,
    title: 'Development sprint',
    phase: 'Execution',
    description: 'Core features, data modeling, and UI polish with mentor checkpoints.',
  },
  {
    day: 3,
    title: 'Refine & finalize',
    phase: 'Polish',
    description: 'Debug, record demos, and prep submissions before the buzzer.',
  },
];

const getAgenda = async (req, res) => {
  try {
    let agenda = await Agenda.find().sort({ day: 1, createdAt: 1 });
    if (agenda.length === 0) {
      await Agenda.insertMany(DEFAULT_AGENDA);
      agenda = await Agenda.find().sort({ day: 1, createdAt: 1 });
    }
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
