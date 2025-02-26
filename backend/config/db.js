import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Ensure MONGODB_URI exists
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MongoDB connection string (MONGO_URI) is missing!");
  process.exit(1); // Stop execution if the URI is missing
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
