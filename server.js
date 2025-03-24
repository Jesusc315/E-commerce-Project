import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { todoRouter } from './index.js';

// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // For parsing JSON requests
app.use(express.static('public')); // Serve static files from 'public' folder
app.use(cors()); // Enable CORS for cross-origin requests

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes for API
app.use('/api', todoRouter);

// Resolve the current directory path using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Serve static HTML files from the public folder
// These will automatically be available at their respective routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'public', 'index.html'));
});
app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'public', 'checkout.html'));
});
app.get('/confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'public', 'confirmation.html'));
});
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'public', 'form.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'public', 'register.html'));
});

// Handle undefined routes (404 error)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Graceful server shutdown on SIGINT (Ctrl+C)
process.on("SIGINT", () => {
  console.log("Stopping server...");
  server.close(() => {
    console.log("Server stopped. Port released.");
    process.exit(0);
  });
});
