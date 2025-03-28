import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();

// Todo Schema and Model
const ProductSchema = new mongoose.Schema({
    product: { 
        type: String, 
        required: true 
    }
});
const product = mongoose.model('Product', ProductSchema);

// GET all todos
router.get('/product', async (req, res) => {
    try {
        const product = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE todo
router.post('/product', async (req, res) => {
    const todo = new Product(req.body);
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET a specific todo by ID
router.get('/[product]/:id', async (req, res) => {
    try {
        const product = await product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
});

// DELETE a specific todo by ID
router.delete('/product/:id', async (req, res) => {
    try {
        const product = await product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
});

export { router as productRouter };
