const User = require('../models/user.model');

exports.createUser = async (req, res) => {
  const { username, email, password} = req.body;
  const newUser = new User({ username, email, password });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add more controller functions for handling other HTTP requests related to users
