import express from 'express';
import bcrypt from 'bcryptjs';
import dotev from 'dotenv';
import usersRoutes from './usersRoutes.js';
import mongoose from 'mongoose';

dotev.config();

const app = express();

app.use(express.json);
app.post('/', (req, res) => {
    const email = mongoose.Types.ObjectId(req.body.email);
    const password = req.body.password;
    console.log(email);
});

