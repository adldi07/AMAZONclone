const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

module.exports = (req, res, next) => {
  try {
    // Read token from cookie instead of Authorization header
    const token = req.cookies.token;

    if (!token) {
      // DUMMY USER FOR DEVELOPMENT
      req.userId = 1;
      req.userEmail = 'dummy@example.com';
      return next();
      // return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
