// Simple Mongoose connection helper
import mongoose from "mongoose";

const connectDB = async (mongoUri) => {
  if (!mongoUri) throw new Error("MONGO_URI environment variable is required");

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
};

export default connectDB;