import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("✅ MongoDB Connected");
    
    // Connection event listeners for debugging
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connection established');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });
    
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};