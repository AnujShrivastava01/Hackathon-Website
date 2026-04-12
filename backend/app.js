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
    const seedUsername = process.env.ADMIN_USERNAME;
    const seedPassword = process.env.ADMIN_PASSWORD;
    const adminCount = await Admin.countDocuments();

    const removeLegacyDefaultAdmin = async () => {
      const usingDefaultSeed = seedUsername === 'admin' && seedPassword === 'admin123';
      if (usingDefaultSeed) return;

      const legacyAdmin = await Admin.findOne({ username: 'admin' });
      if (!legacyAdmin) return;

      const isLegacyDefaultPassword = await bcrypt.compare('admin123', legacyAdmin.password);
      if (isLegacyDefaultPassword) {
        await legacyAdmin.deleteOne();
        console.log('Legacy default admin credentials removed');
      }
    };

    if (!seedUsername || !seedPassword) {
      if (adminCount === 0) {
        console.warn('No admin found and ADMIN_USERNAME/ADMIN_PASSWORD are not set. Skipping admin seed.');
      }
      return;
    }

    const hashedPassword = await bcrypt.hash(seedPassword, 10);

    // If configured admin exists, always keep password in sync with env value.
    const configuredAdmin = await Admin.findOne({ username: seedUsername });
    if (configuredAdmin) {
      configuredAdmin.password = hashedPassword;
      await configuredAdmin.save();
      await removeLegacyDefaultAdmin();
      console.log('Admin credentials synced from environment');
      return;
    }

    if (adminCount === 0) {
      await Admin.create({
        username: seedUsername,
        password: hashedPassword,
      });
      await removeLegacyDefaultAdmin();
      console.log('Admin user seeded');
      return;
    }

    // Migrate legacy single-admin setup (e.g. admin/admin123) to env credentials.
    if (adminCount === 1) {
      const existingAdmin = await Admin.findOne();
      existingAdmin.username = seedUsername;
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      await removeLegacyDefaultAdmin();
      console.log('Legacy admin migrated to environment credentials');
      return;
    }

    // Multi-admin case: preserve existing users and ensure env admin is available.
    await Admin.create({
      username: seedUsername,
      password: hashedPassword,
    });
    await removeLegacyDefaultAdmin();
    console.log('Configured admin added from environment credentials');
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
