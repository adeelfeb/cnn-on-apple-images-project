import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Signup Controller
export const signup = async (req, res) => {
  const { name, password, city, phone, role } = req.body;

  if (!name || !password || !city || !phone || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const newUser = new User({
      name,
      password,  // Store the password as plain text (you should hash it)
      city,
      phone,
      role,
      image: imageUrl,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { name, password, role } = req.body;

  if (!name || !password || !role) {
    return res.status(400).json({ message: 'Name, password, and role are required' });
  }

  try {
    const user = await User.findOne({ name, role });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      user: { name: user.name, role: user.role, token },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
