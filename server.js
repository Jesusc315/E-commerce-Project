import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { todoRouter } from './index.js';

// Load environment variables
dotenv.config();



// Initialize express
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
  // Ensure this import is placed here
app.use('/api', todoRouter);

// Basic route to serve the index.html file
app.get('/', (req, res) => {
    res.json('welcome to my site');
});

// Start server
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

process.on("SIGINT", () => {
  console.log("Stopping server...");
  server.close(() => {
    console.log("Server stopped. Port released.");
    process.exit(0);
  });
});
