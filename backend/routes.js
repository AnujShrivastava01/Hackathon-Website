const express = require('express');
const router = express.Namespace ? express.Namespace() : express.Router();
const { loginAdmin, logoutAdmin, getMe } = require('./controllers/authController');
const { getEvent, updateEvent } = require('./controllers/eventController');
const { getAgenda, createAgenda, updateAgenda, deleteAgenda } = require('./controllers/agendaController');
const { getSchedule, createSchedule, updateSchedule, deleteSchedule } = require('./controllers/scheduleController');
const { getFAQs, createFAQ, updateFAQ, deleteFAQ } = require('./controllers/faqController');
const { protect } = require('./middleware/authMiddleware');

// Auth Routes
router.post('/auth/login', loginAdmin);
router.post('/auth/logout', logoutAdmin);
router.get('/auth/me', protect, getMe);

// Event Routes
router.get('/event', getEvent);
router.put('/event', protect, updateEvent);

// Agenda Routes
router.get('/agenda', getAgenda);
router.post('/agenda', protect, createAgenda);
router.put('/agenda/:id', protect, updateAgenda);
router.delete('/agenda/:id', protect, deleteAgenda);

// Schedule Routes
router.get('/schedule', getSchedule);
router.post('/schedule', protect, createSchedule);
router.put('/schedule/:id', protect, updateSchedule);
router.delete('/schedule/:id', protect, deleteSchedule);

// FAQ Routes
router.get('/faqs', getFAQs);
router.post('/faqs', protect, createFAQ);
router.put('/faqs/:id', protect, updateFAQ);
router.delete('/faqs/:id', protect, deleteFAQ);

module.exports = router;
