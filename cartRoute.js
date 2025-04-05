import express from 'express';
import { User } from './user'; // Assuming User model is defined
import { productRouter } from './product.js';

const router = express.Router();

// Save the cart data (for a specific user)
router.post('/save-cart', async (req, res) => {
  const { userId, cart } = req.body; // Expecting userId and cart data in the request body
  
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.cart = cart; // Update user's cart
    await user.save();
    res.json({ message: 'Cart saved successfully', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error saving cart', error });
  }
});

export { router as cartRouter };
