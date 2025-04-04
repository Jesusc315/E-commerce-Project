import { productRouter } from './product.js';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';


// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // For parsing JSON requests
app.use(express.static('public')); // Serve static files from 'public' folder

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes for API
app.use('api', productRouter);

app.get('/' , (req,res)=> {
  res.sendFile_(join(__dirname , 'public/index.html'));
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
