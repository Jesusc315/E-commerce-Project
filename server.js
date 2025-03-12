import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { join } from 'path';  // Importing the 'join' method from 'path'
import { fileURLToPath } from 'url'; // To use fileURLToPath
import { dirname } from 'path';  // To extract the directory name

// Load environment variables
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize express
const app = express();
const port = 3000;
app.use(express.static('client'));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
import { todoRouter } from './index.js';  // Ensure this import is placed here
app.use('/api', todoRouter);

// Basic route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, './index.html'));
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
