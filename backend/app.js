require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const routes = require('./routes');
const Admin = require('./models/Admin');

const app = express();

const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean)
  : ['http://localhost:5173'];

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      if (corsOrigins.includes(origin)) return cb(null, true);
      cb(null, false);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

/** Root URL (browser or uptime checks) — API lives under /api */
app.get('/', (req, res) => {
  res.json({
    name: 'HackOcean API',
    status: 'ok',
    routes: '/api/*',
    example: '/api/event',
  });
});

const seedAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
      await Admin.create({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: hashedPassword,
      });
      console.log('Admin user seeded');
    }
  } catch (err) {
    console.error('Error seeding admin:', err);
  }
};

let readyPromise;
const ensureReady = () => {
  if (!readyPromise) {
    readyPromise = (async () => {
      await connectDB();
      await seedAdmin();
    })();
  }
  return readyPromise;
};

app.use(async (req, res, next) => {
  try {
    await ensureReady();
    next();
  } catch (err) {
    next(err);
  }
});

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
