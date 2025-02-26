import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config';

// ✅ Load environment variables
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ ERROR: MONGODB_URI is missing in .env");
  process.exit(1); // Exit process if MongoDB URI is not set
}

// ✅ Connect to the database
connectDB();

// ✅ Initialize Express app
const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(cors());

// ✅ API Endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ✅ Health Check
app.get("/", (req, res) => {
  res.send("🚀 API is working!");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server started at: http://localhost:${PORT}`);
});

