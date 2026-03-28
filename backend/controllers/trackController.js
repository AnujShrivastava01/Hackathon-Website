const Track = require('../models/Track');

/** Shown on the site when the tracks collection is empty (first deploy / fresh DB). */
const DEFAULT_TRACKS = [
  {
    sortOrder: 0,
    title: 'Tide & Web',
    description:
      'Full-stack apps, PWAs, and real-time dashboards—ship a product people can use on day one. APIs, auth, pixel-perfect UI, and performance that holds under load.',
  },
  {
    sortOrder: 1,
    title: 'Deep AI & ML',
    description:
      'LLMs, agents, computer vision, and smart pipelines that turn messy data into decisions. Bonus points for clear evaluation, safety, and a demo that wows.',
  },
  {
    sortOrder: 2,
    title: 'Mobile & Edge',
    description:
      'iOS, Android, cross-platform, and wearable experiences—optimized for touch, offline moments, and notifications that matter.',
  },
  {
    sortOrder: 3,
    title: 'FinTech & Open Data',
    description:
      'Payments, transparency, budgeting, and civic-minded tools—build trust with solid UX and responsible handling of sensitive flows.',
  },
  {
    sortOrder: 4,
    title: 'Climate & Blue Planet',
    description:
      'Sustainability, marine awareness, IoT, and green tech—measurable impact, thoughtful sensors, and stories that inspire action.',
  },
  {
    sortOrder: 5,
    title: 'Open Ocean (Wildcard)',
    description:
      'Any stack, any domain. Game, hardware, art + code, or a wild experiment—if you can pitch it and demo it, this is your bay.',
  },
];

const getTracks = async (req, res) => {
  try {
    let tracks = await Track.find().sort({ sortOrder: 1, createdAt: 1 });
    if (tracks.length === 0) {
      await Track.insertMany(DEFAULT_TRACKS);
      tracks = await Track.find().sort({ sortOrder: 1, createdAt: 1 });
    }
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
