import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(
    cors({
        origin: "https://vitorder17-frontend.onrender.com", // Allow only frontend
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Enable cookies if needed
    })
);

// Manual CORS header setup (optional, for extra security)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://vitorder17-frontend.onrender.com");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// Database connection
connectDB();

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
