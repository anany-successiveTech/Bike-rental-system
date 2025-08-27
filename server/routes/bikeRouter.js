import express from "express";
const bikeRouter = express.Router();
import { addBike, getAllBikes } from "../controllers/bike.js";
import { uploadImage } from "../controllers/upload.js";

bikeRouter.post("/add-bike", addBike);
bikeRouter.post("/upload-image", uploadImage);
bikeRouter.get("/all-bikes", getAllBikes);

export default bikeRouter;
