// routes/cartRoute.js
import express from "express";
import { CartModel } from "../models/Cart.js";
import { productModel } from "../models/Product.js";

const router = express.Router();

// Get cart for a user
router.get("/:email", async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userEmail: req.params.email }).populate("items.product");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// Add product to cart
router.post("/add", async (req, res) => {
  const { email, productId, quantity } = req.body;
  try {
    let cart = await CartModel.findOne({ userEmail: email });

    if (!cart) {
      cart = new CartModel({ userEmail: email, items: [] });
    }

    const index = cart.items.findIndex(item => item.product.toString() === productId);
    if (index > -1) {
      cart.items[index].quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// Remove product from cart
router.post("/remove", async (req, res) => {
  const { email, productId } = req.body;
  try {
    const cart = await CartModel.findOne({ userEmail: email });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error removing from cart" });
  }
});

export { router as cartRoute };
