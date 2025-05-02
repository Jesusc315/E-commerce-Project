// models/Cart.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const cartSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  items: [cartItemSchema]
});

export const CartModel = mongoose.model("Cart", cartSchema);
