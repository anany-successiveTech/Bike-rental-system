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
import validate from "../middleware/schemaValidation.js";
import { addBikeSchema, ratingSchema, updateBikeSchema } from "../validations/bikeValidation.js";
import authentication from "../middleware/authentication.js";

// These are the bike related routes.
// Here i am reffering "ADMIN" to the bike provider.

bikeRouter.post("/add-bike", validate(addBikeSchema), authentication, addBike); // ONLY FOR ADMIN

bikeRouter.post("/upload-image", authentication, uploadImage); // ONLY FOR ADMIN

bikeRouter.get("/all-bikes", getAllBikes);

bikeRouter.put("/update-bike/:id", validate(updateBikeSchema), authentication, updateBikeDetails); // ONLY FOR ADMIN

bikeRouter.delete("/delete-bike/:id", authentication, deleteBike); // ONLY FOR ADMIN

bikeRouter.put("/rate-bike", validate(ratingSchema), authentication, bikeRating); // ONLY FOR CUSTOMERS

export default bikeRouter;
