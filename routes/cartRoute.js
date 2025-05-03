import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cartModel } from '../models/Cart.js';
import { userModel } from '../models/User.js';

const router = express.Router();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, 'yourSecretKey', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.userId = decoded.userId;
    next();
  });
};

// POST /api/cart/checkout
router.post('/checkout', authenticateJWT, async (req, res) => {
  const { products, shipping, subtotal, tax, total, password } = req.body;

  if (!products?.length || !shipping || !subtotal || !tax || !total || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {

    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json({ message: 'Incorrect password' });

    const newCart = new cartModel({
      user: req.userId,
      products,
      shipping,
      subtotal,
      tax,
      total
    });

    const savedCart = await newCart.save();
    res.status(201).json({ message: 'Cart saved successfully', orderId: savedCart._id });
  } catch (err) {
    console.error('Error saving cart:', err);
    res.status(500).json({ message: 'Server error saving cart' });
  }
});

export {router as cartRoute};
