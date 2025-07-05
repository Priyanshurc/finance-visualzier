import mongoose from 'mongoose';

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    console.log('🟡 MongoDB already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🟢 MongoDB connected successfully');
  } catch (err) {
    console.error('🔴 MongoDB connection error:', err);
  }
}
