require('dotenv').config();
const express = require('express');

const app = express();

// Lazy load CORS and CookieParser
app.use((req, res, next) => {
  const cors = require('cors');
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'https://amazo-nclone.vercel.app'
  ].filter(Boolean);

  return cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })(req, res, next);
});

app.use((req, res, next) => {
  const cookieParser = require('cookie-parser');
  return cookieParser()(req, res, next);
});

app.use(express.json());

// Simple Test Endpoint (Absolute zero top-level dependencies)
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend is alive!',
    time: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      DB_URL_PRESENT: !!process.env.POSTGRES_URL
    }
  });
});

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
  try {
    const { sequelize } = require('./models');
    await sequelize.authenticate();
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected', details: error.message });
  }
});

// Lazy load routes
app.use('/api/auth', (req, res, next) => require('./routes/authRoutes')(req, res, next));
app.use('/api/products', (req, res, next) => require('./routes/productRoutes')(req, res, next));
app.use('/api/cart', (req, res, next) => require('./routes/cartRoutes')(req, res, next));
app.use('/api/orders', (req, res, next) => require('./routes/orderRoutes')(req, res, next));

const PORT = process.env.PORT || 5000;

// Local development sync
if (process.env.NODE_ENV !== 'production') {
  const { sequelize } = require('./models');
  sequelize.sync({ alter: true })
    .then(() => {
      console.log('Database synced successfully');
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Database sync failed:', err.message));
}

module.exports = app;
