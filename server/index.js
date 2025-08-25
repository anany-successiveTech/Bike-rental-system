import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/Bike-rental-system";
console.log(MONGO_URI);

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

connectDB(MONGO_URI);
