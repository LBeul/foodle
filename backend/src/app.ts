import 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/auth';
import mongoose from 'mongoose';
import restaurantsRouter from './routes/restaurants';
import errorHandler from './utils/errorHandler';

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
app.use('/api/auth', authRouter);
app.use('/api/restaurants', restaurantsRouter);

app.use(errorHandler);

export default app;
