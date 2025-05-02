import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 }
    }
  ],
  shipping: {
    address: String,
    apartment: String,
    city: String,
    state: String,
    zip: String
  },
  subtotal: Number,
  tax: Number,
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const cart = mongoose.model("Cart", cartSchema); 
export { cart as cartModel };
