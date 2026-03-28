const Event = require('../models/Event');

function normalizeRegistrationLink(raw) {
  if (typeof raw !== 'string') return raw;
  return raw
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '')
    .replace(/\s+/g, '')
    .trim();
}

const DEFAULT_HERO_CAROUSEL = [
  { url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&q=80&auto=format&fit=crop', caption: 'Arcade-grade focus' },
  { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&q=80&auto=format&fit=crop', caption: 'Terminal tide' },
  { url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1000&q=80&auto=format&fit=crop', caption: 'Neon ship mode' },
  { url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1000&q=80&auto=format&fit=crop', caption: 'Classic workspace' },
  { url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1000&q=80&auto=format&fit=crop', caption: 'Hit record on your build' },
];

const getEvent = async (req, res) => {
  try {
    let event = await Event.findOne();
    if (!event) {
      event = await Event.create({
        name: 'Hackathon Portal',
        description: 'Build, innovate, and create the next big thing. Join developers, designers, and visionaries for 48 hours of intense hacking and collaboration.',
        venue: 'Silicon Valley, CA',
        contactEmail: 'hello@hackathon.com',
        registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdO7N7vXy7v3z_XhA/viewform',
        heroCarousel: DEFAULT_HERO_CAROUSEL,
      });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const body = { ...req.body };
    if (typeof body.registrationLink === 'string') {
      body.registrationLink = normalizeRegistrationLink(body.registrationLink);
    }
    let event = await Event.findOne();
    if (event) {
      event = await Event.findOneAndUpdate({}, body, { new: true });
    } else {
      event = await Event.create(body);
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getEvent, updateEvent };
