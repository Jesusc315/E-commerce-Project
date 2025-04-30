import * as dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path'; // For working with file paths
import mongoose from "mongoose";
import { userRoute } from "./routes/userRoute.js";
import {authRoute} from "./routes/authRoute.js"
// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if no PORT is set

// Get current directory path using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Middleware
app.use(bodyParser.json());
app.use(express.json()); // For parsing JSON requests
app.use(express.static('public')); // Serve static files from 'public' folder

// User API route
app.use("/api", userRoute);
app.use('/api', authRoute);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
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
