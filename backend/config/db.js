import mongoose from 'mongoose';

export const connectDB = () => {
  mongoose.connect(
    process.env.MONGO_URI, // You can store your Mongo URI in .env
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error: ", error));
};
