import mongoose from "mongoose";

// Cart Schema
const cartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  products: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      quantity: { 
        type: Number, 
        default: 1,
        min: 1 
      }
    }
  ],
  shipping: {
    fullName: { type: String },
    address: { type: String },
    email: {
      type: String,
      match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format']
    }
  },
  subtotal: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  isDraft: { type: Boolean, default: true }
}, { timestamps: true });

// Cart Model
const Cart = mongoose.model("Cart", cartSchema);

export { Cart as cartModel };
