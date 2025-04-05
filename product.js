import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();

// Todo Schema and Model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  });
const Product = mongoose.model('Product', productSchema);  // Changed to Product for consistency

// GET all products
router.get('/product', async (req, res) => {
    try {
        const products = await Product.find();  // Fetching all products from the DB
        res.json({ products });  // Returning the list of products as JSON
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// CREATE product
router.post('/product', async (req, res) => {
    const product = new Product(req.body);  // Changed to Product to use the correct model
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);  // Returning the created product
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET a specific product by ID
router.get('/product', async (req, res) => {  // Corrected route to /product/:id
    try {
        const product = await Product.findById(req.params.id);  // Use the Product model here
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);  // Return the found product
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
});

// DELETE a specific product by ID
router.delete('/product', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);  // Use the Product model here
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
});

export { router as productRouter };
