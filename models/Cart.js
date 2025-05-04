// models/Cart.js
import mongoose from "mongoose";

// Schema for product details in cart
const productSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true } // You may want to get price from Product in real implementation
}, { _id: false });

// Schema for shipping details
const shippingSchema = new mongoose.Schema({
  email: {type:String, required: true},
  address: { type: String, required: true },
  apartment: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true }
}, { _id: false });

// Cart Schema
const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [productSchema], // Nested product schema
    shipping: shippingSchema,  // Use the shipping schema for more detailed address info
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  { timestamps: true } // This adds createdAt and updatedAt timestamps
);

// Cart Model
const Cart = mongoose.model("Cart", cartSchema);

export { Cart as cartModel };
