import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { Server } from 'http';

dotenv.config();

const app=express();
const port=5000;
app.use(express.static('client'));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Connected to MongoDB'))
.catch((err)=>console.log(err));
app.use('/api',require('./routes/api'));
 
app.get('*',(req,res)=>{
    res.sendFile(join(__dirname,'client/index.html'));
}
);
app.listen(port,()=>console.log(`Server is running on port ${port}`));
process.on("SINGINT", () => {
    console.log("Shutting down");
    Server.close(() => {
        console.log("Server is closed");
    }
    );
}