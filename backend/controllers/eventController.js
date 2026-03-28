const Event = require('../models/Event');

const getEvent = async (req, res) => {
  try {
    let event = await Event.findOne();
    if (!event) {
      event = await Event.create({
        name: 'Hackathon Portal',
        description: 'Build, innovate, and create the next big thing. Join developers, designers, and visionaries for 48 hours of intense hacking and collaboration.',
        venue: 'Silicon Valley, CA',
        contactEmail: 'hello@hackathon.com'
      });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    let event = await Event.findOne();
    if (event) {
      event = await Event.findOneAndUpdate({}, req.body, { new: true });
    } else {
      event = await Event.create(req.body);
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getEvent, updateEvent };
