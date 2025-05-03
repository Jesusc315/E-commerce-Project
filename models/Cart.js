// models/Cart.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
}, { _id: false });

const shippingSchema = new mongoose.Schema({
  address: String,
  apartment: String,
  city: String,
  state: String,
  zip: String
}, { _id: false });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [productSchema],
  shipping: shippingSchema,
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema); 
export { Cart as cartModel };
