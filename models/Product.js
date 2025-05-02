import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // You might want to validate this as a URL
      required: true,
    },
  });
const product = mongoose.model("product", productSchema);
export { product as productModel } 