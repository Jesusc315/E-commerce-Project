import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path'; // For working with file paths
import mongoose from "mongoose";
import { cartRoute } from "./routes/cartRoute.js";
import {authRoute} from "./routes/authRoute.js"
import { productRoutes } from "./routes/productRoute.js";
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if no PORT is set

// Get current directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); // For parsing JSON requests


// User API route
app.use("/api/cart", cartRoute);
app.use('/api/auth', authRoute);
app.use("/api/products", productRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.use(express.static('public')); // Serve static files from 'public' folder

app.get('/users.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'users.json'));
});
// Checkout route
app.get("/checkout", (req, res) => {
  const checkoutPath = path.join(__dirname, 'public', 'checkout.html');
  res.sendFile(checkoutPath);
});

app.get("/confirmation", (req, res) => {
  const confirmationPath = path.join(__dirname, 'public', 'confirmation.html');
  res.sendFile(confirmationPath);
})
// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
