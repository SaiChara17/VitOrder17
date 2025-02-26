import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path"; // Ensure correct .env path
import { fileURLToPath } from "url";

// Fix for ES module-based projects
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Debug: Log all environment variables
console.log("🔍 Process.env: ", process.env);

// Explicitly log `MONGODB_URI`
console.log("🔍 MongoDB URI from process.env:", process.env.MONGODB_URI);

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error("❌ ERROR: MONGODB_URI is missing in .env");
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

