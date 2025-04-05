import express from 'express';
import { User } from './user.js';  // Adjust this path to match your file structure
import { Product } from './product.js';  // Adjust this path to match your file structure
import jwt from 'jsonwebtoken';  // Add this import at the top of the file


const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user and save to database
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// User Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Get User's Cart
router.get('/cart', async (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.userId).populate('cart.productId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
});

// Add Product to User's Cart
router.post('/cart', async (req, res) => {
  const token = req.headers['authorization'];
  const { productId, quantity } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if product already exists in the cart
    const existingProduct = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      // If product exists, update the quantity
      existingProduct.quantity += quantity;
    } else {
      // If product doesn't exist, add it to the cart
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart', error });
  }
});

export { router };
