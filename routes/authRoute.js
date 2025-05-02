import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/User.js';

const router = express.Router();
const JWT_SECRET = 'yourSecretKey'; // In production, store this in .env

// REGISTER
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await userModel.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new userModel({ email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.log('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as authRoute };
