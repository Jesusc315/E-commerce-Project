import {userModel} from "../models/User.js";
import express from "express";
const router =  express.Router();


router.post('/api/login', async (req, res) => {
    const user = new userModel(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export {router as userRoute};