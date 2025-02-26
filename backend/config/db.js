import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
const envFound = dotenv.config({ path: path.resolve(__dirname, "../.env") });


if (envFound.error) {
  console.error("❌ ERROR: Failed to load .env file");
  process.exit(1);
}

// Debug: Log only MongoDB URI to avoid exposing all env variables
console.log("🔍 MongoDB URI from process.env:", process.env.MONGODB_URI || "❌ Not Found");

// Validate MONGODB_URI
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error("❌ ERROR: MONGODB_URI is missing in .env");
  process.exit(1);
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ DB Connected Successfully");
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
    process.exit(1);
  }
};

