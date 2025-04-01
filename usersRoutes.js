import express from 'express';
import dotev from 'dotenv';
import user from 'user.js';
import mongoose from 'mongoose';

dotev.config();

const app = express();

app.use(express.json);

app.post('/api/users/register', (req, res) => {
    res.send("Hello World!")
});

app.post('/api/users/login' , (req, res) => {
    res.send("Hello World")
});