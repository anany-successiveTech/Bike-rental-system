import express from "express";
const bikeRouter = express.Router();
import {
  addBike,
  getAllBikes,
  updateBikeDetails,
  deleteBike,
  bikeRating,
} from "../controllers/bike.js";
import { uploadImage } from "../controllers/upload.js";

// These are the bike related routes.

bikeRouter.post("/add-bike", addBike); // ONLY FOR ADMIN
bikeRouter.post("/upload-image", uploadImage); // ONLY FOR ADMIN
bikeRouter.get("/all-bikes", getAllBikes);
bikeRouter.put("/update-bike/:id", updateBikeDetails); // ONLY FOR ADMIN
bikeRouter.delete("/delete-bike/:id", deleteBike); // ONLY FOR ADMIN
bikeRouter.put("/rate-bike", bikeRating); // ONLY FOR CUSTOMERS

export default bikeRouter;
