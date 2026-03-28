const Track = require('../models/Track');

const getTracks = async (req, res) => {
  try {
    const tracks = await Track.find().sort({ sortOrder: 1, createdAt: 1 });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createTrack = async (req, res) => {
  try {
    const track = await Track.create(req.body);
    res.status(201).json(track);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateTrack = async (req, res) => {
  try {
    const track = await Track.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!track) return res.status(404).json({ message: 'Track not found' });
    res.json(track);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteTrack = async (req, res) => {
  try {
    await Track.findByIdAndDelete(req.params.id);
    res.json({ message: 'Track deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getTracks, createTrack, updateTrack, deleteTrack };
