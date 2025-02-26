import dotenv from "dotenv";
dotenv.config(); // Load .env variables

import mongoose from "mongoose";

// Debugging: Check if MONGO_URI is loaded
console.log("🔍 MongoDB URI from .env:", process.env.MONGO_URI);

const MONGO_URI = process.env.MONGO_URI; // Ensure this matches Render

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is missing in .env");
  process.exit(1);
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

