import mongoose from 'mongoose';
import 'dotenv/config';

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log('MongoDB connection error:', err));
} else {
  throw new Error('MongoDB URI not found');
}
