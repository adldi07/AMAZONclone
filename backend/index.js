require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// CORS configuration for cookies
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'https://amazo-nclone.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// IMPORTANT: Start server immediately for local debugging
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Simple Test Endpoint (Zero dependencies)
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend is alive!',
    time: new Date().toISOString()
  });
});

// Health Check Endpoint (Lazy Load DB)
app.get('/api/health', async (req, res) => {
  try {
    const { sequelize } = require('./models');
    await sequelize.authenticate();
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected', details: error.message });
  }
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Local development sync
if (process.env.NODE_ENV !== 'production') {
  const { sequelize } = require('./models');
  sequelize.sync({ alter: true })
    .then(() => console.log('Database synced successfully'))
    .catch(err => console.error('Database sync failed (Server still running):', err.message));
}

module.exports = app;
