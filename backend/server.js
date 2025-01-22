import dotenv from 'dotenv';
import express from 'express';
import connectMongoDB from './db/connectMongoDB.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config()
const app = express()
app.use('/api/auth',authRoutes);

app.listen(process.env.PORT,()=>{
    connectMongoDB();
    console.log("Server is up and running")
})