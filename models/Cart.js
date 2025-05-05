// models/Cart.js
import mongoose from "mongoose";

// Cart Schema
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    }
  ],
  shipping: {
    fullName: String,
    address: String,
    email: String
  },
  subtotal: Number,
  tax: Number,
  total: Number,
  isDraft: { type: Boolean, default: true }
}, { timestamps: true });


// Cart Model
const Cart = mongoose.model("Cart", cartSchema);

export { Cart as cartModel };
