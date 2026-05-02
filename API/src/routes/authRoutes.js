const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Routes publiques
router.post('/login', authController.login);
router.post('/register', authController.register); // optionnel

// Routes protégées
router.get('/me', protect, authController.getMe);

module.exports = router;