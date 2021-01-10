import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('starting ... ..');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!');
  });
};

start();
