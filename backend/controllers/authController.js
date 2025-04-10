import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { name, password, city, phone, role } = req.body;

  if (!name || !password || !city || !phone || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const newUser = new User({
      name,
      password,
      city,
      phone,
      role,
      image: imageUrl,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const login = async (req, res) => {
  const { name, password, role } = req.body;

  if (!name || !password || !role) {
    return res.status(400).json({ message: 'Name, password, and role are required' });
  }

  try {
    const user = await User.findOne({ name, role });

    if (!user) {
      return res.status(400).json({ message: 'User not found with provided name and role' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { name: user.name, image: user.image, role: user.role },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};