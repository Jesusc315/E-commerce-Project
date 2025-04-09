import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";
import {userRoute} from "./userRoute.js"

// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json()); // For parsing JSON requests
app.use(express.static('public')); // Serve static files from 'public' folder
app.use("/api", userRoute);
// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


//basic route
app.get("/" , (res,req)=>{
  res.json("welcome to my project");
});

app.listen(port, ()=> {
  console.log(`server is running at http://localhost:${port}`);
});
