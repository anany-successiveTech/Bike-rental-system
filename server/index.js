import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import bikeRouter from "./routes/bikeRouter.js";
import handleGlobalError from "./middleware/globalErrorHandler.js";
import bookingRouter from "./routes/bookingRouter.js";
// import paymentRouter from "./routes/paymentRouter.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());


const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/Bike-rental-system";

const PORT = process.env.PORT || 5200;

app.use(express.json());
app.set("trust proxy", true); // tells Express to trust the proxy and use the real client IP. (read more about it).

// Home route just for testing.
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bikes", bikeRouter);
app.use("/api/v1/bookings", bookingRouter);
// app.use("/api/v1/payments", paymentRouter);

// Global error handler middleware.
app.use(handleGlobalError);

// Connect DB first, then start server
connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});
