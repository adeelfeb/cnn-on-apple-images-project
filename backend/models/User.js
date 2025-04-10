import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String },
});

export default mongoose.model('User', userSchema);
