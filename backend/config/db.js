import dotenv from "dotenv";
dotenv.config(); // Load .env variables FIRST

import mongoose from "mongoose";

// Debugging: Check if MONGO_URI is loaded
console.log("🔍 MongoDB URI from .env:", process.env.MONGO_URI);

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MongoDB connection string (MONGO_URI) is missing!");
  process.exit(1); // Stop execution if URI is missing
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ DB Connected Successfully");
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
    process.exit(1);
  }
};

