import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cartModel } from '../models/Cart.js';
import { userModel } from '../models/User.js';

const router = express.Router();

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  // Verify the JWT token
  jwt.verify(token, 'yourSecretKey', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.userId = decoded.userId; // Attach the userId to the request
    next(); // Call the next middleware
  });
};

// POST /api/cart/checkout - To finalize the cart and checkout
router.post('/checkout', authenticateJWT, async (req, res) => {
  const { products, shipping, subtotal, tax, total, password } = req.body;

  if (!products?.length || !shipping || !subtotal || !tax || !total || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the user exists
    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json({ message: 'Incorrect password' });

    // Create a new cart
    const newCart = new cartModel({
      user: req.userId,
      products,
      shipping,
      subtotal,
      tax,
      total,
    });

    // Save the cart to the database
    const savedCart = await newCart.save();
    res.status(201).json({ message: 'Cart saved successfully', orderId: savedCart._id });
  } catch (err) {
    console.error('Error saving cart:', err);
    res.status(500).json({ message: 'Server error saving cart' });
  }
});

// GET /api/cart - To fetch the cart for the authenticated user
router.get('/', authenticateJWT, async (req, res) => {
  try {
    // Find the latest cart for the authenticated user and populate product details
    const cart = await cartModel
      .findOne({ user: req.userId }) // Ensure that the cart belongs to the authenticated user
      .populate('products.productId'); // Populate product details (e.g., name, price, etc.)

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user.' });
    }

    res.status(200).json(cart); // Send the cart as the response
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export { router as cartRoute };
