const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper: générer token JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// @desc    Connexion
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    // Mise à jour last login
    user.lastLogin = new Date();
    await user.save();
    const token = generateToken(user);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    S'enregistrer (admin seulement si on veut)
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, role } = req.body;
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(400).json({ success: false, message: 'User already exists' });
    const user = new User({ username, email, passwordHash: password, firstName, lastName, role });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ success: true, token, user: { id: user._id, username, email, role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Obtenir l'utilisateur courant
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};