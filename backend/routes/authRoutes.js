const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout); // NEW
router.get('/profile', authMiddleware, authController.getProfile);
router.get('/check', authMiddleware, authController.checkAuth); // NEW - Check if user is logged in

module.exports = router;
