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

  // Validate and normalize products for both draft and full cart
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'Products are required' });
  }

  const normalizedProducts = products.map((p) => ({
    productId: p.productId,
    quantity: p.quantity || 1,
  }));

  //  PARTIAL CHECKOUT (only products)
  if (!shipping && !subtotal && !tax && !total && !password) {
    try {
      console.log(" Saving draft cart for user:", req.userId);
      const draftCart = new cartModel({
        user: req.userId,
        products: normalizedProducts,
        isDraft: true,
      });

      const savedCart = await draftCart.save();
      console.log("Draft cart saved:", savedCart._id);
      return res.status(201).json({ message: 'Cart draft saved', cartId: savedCart._id });
    } catch (err) {
      console.error(" Error saving draft cart:", err);
      return res.status(500).json({ message: 'Server error saving draft' });
    }
  }

  // FULL CHECKOUT
  if (!shipping || !subtotal || !tax || !total || !password) {
    return res.status(400).json({ message: 'Missing fields for final checkout' });
  }

  if (!shipping.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(shipping.email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json({ message: 'Incorrect password' });

    const finalCart = new cartModel({
      user: req.userId,
      products: normalizedProducts,
      shipping,
      subtotal,
      tax,
      total,
      isDraft: false,
    });

    const savedCart = await finalCart.save();
    console.log("Final cart saved:", savedCart._id);
    return res.status(201).json({ message: 'Checkout successful', orderId: savedCart._id });
  } catch (err) {
    console.error("Error during final checkout:", err);
    return res.status(500).json({ message: 'Server error during checkout' });
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
