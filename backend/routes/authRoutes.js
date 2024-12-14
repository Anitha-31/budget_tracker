// routes/authRoutes.js
const express = require('express');
const { register, login, getProfile, updateProfile, logout } = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateUser, getProfile);
router.put('/profile', authenticateUser, updateProfile);
router.post('/logout', authenticateUser, logout);

module.exports = router;
