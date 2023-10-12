import 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './controllers/auth';
import mongoose from 'mongoose';
import restaurantsRouter from './controllers/restaurants';

const app = express();

// Configure mongoDB
mongoose
  .connect(process.env.MONGODB_URI ?? '')
  .then(() => console.log('Connected to mongoDB'))
  .catch((e) => console.error('Error connecting to mongoDB:', e.message));

// Invoke middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Invoke routers
app.use('/users', authRouter);
app.use('/restaurants', restaurantsRouter);

export default app;
