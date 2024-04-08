import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import User from './models/user.model.js';
import corsOption from './cors/corsOption.js';
import cors from 'cors'

dotenv.config();
const app = express();
app.use(cors(corsOption))

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'index.html'));
// });

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.get('/api/test', (req,res,next)=>{
  res.json({'msg':'running'}).status(200)
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

