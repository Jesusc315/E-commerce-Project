import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  products: [
    {
      name: String,
      price: Number,
    },
  ],
  shipping: {
    email: String,
    address: String,
    apartment: String,
    city: String,
    state: String,
    zip: String,
  },
  subtotal: Number,
  tax: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);
export { Order as orderModel };
