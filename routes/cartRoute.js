import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cartModel } from '../models/Cart.js';
import { userModel } from '../models/User.js';

const router = express.Router();

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, 'yourSecretKey', (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    
    req.userId = decoded.userId; // Attach userId to request object
    next(); // Continue to the next middleware or route
  });
};


// POST /api/cart/checkout - To finalize the cart and checkout
router.post('/', authenticateJWT, async (req, res) => {
  const { products, shipping, subtotal, tax, total, password } = req.body;

  if (!products?.length || !shipping || !subtotal || !tax || !total || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
if (!shipping.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(shipping.email)) {
  return res.status(400).json({ message: 'Invalid or missing email' });
} 
  try {
    // Check if the user exists
    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if user exists
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
    console.log("error saving chosen products");
  }
});

// GET /api/cart - To fetch the cart for the authenticated user

router.get('/', authenticateJWT, async (req, res) => {
  try {
    // Find the latest cart for the authenticated user, sorted by creation time
    const cart = await cartModel
      .findOne({ user: req.userId })
      .sort({ createdAt: -1 }) // Ensure the most recent cart is fetched
      .populate('products.productId', 'name price'); // Populate product details (name, price)

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user.' });
    }

    // Filter out products with no valid productId (e.g., if product was deleted)
    cart.products = cart.products.filter(p => p.productId);

    // Send the cart with specific fields formatted for the frontend
    res.status(200).json({
      products: cart.products.map(p => ({
        name: p.productId.name,
        price: p.productId.price,
        quantity: p.quantity,
      })),
      subtotal: cart.subtotal,
      tax: cart.tax,
      total: cart.total,
    });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export { router as cartRoute };
