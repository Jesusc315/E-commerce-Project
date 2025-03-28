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

// GET all products
router.get('/product', async (req, res) => {
    {"products" [
        {
            "id":1,
            "name":"Product 1",
            "description":"Description for product 1",
            "price":10.99,
            "image": "image/pngtree-cheese-burger-design-png-image_2437303.jpg"
        }
    ]
}
});

// CREATE products
router.post('/product', async (req, res) => {
    const todo = new Product(req.body);
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET a specific product by ID
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
