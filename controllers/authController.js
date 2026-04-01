const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
// REGISTER
exports.register = async (req, res) => {
  try {
    // Just pass the plain password! Mongoose's pre('save') hook will hash it.
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password 
    });

    await newUser.save();
    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    // 1. Find user by email
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user) return res.status(400).json("User not found");

    // 2. Check password using your custom model method!
    const validPassword = await user.matchPassword(req.body.password);
    if (!validPassword) return res.status(400).json("Wrong password");

    // 3. Create and assign a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token: token, message: "Logged in!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};