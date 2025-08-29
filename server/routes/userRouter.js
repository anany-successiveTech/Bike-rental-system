import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/user.js";
import validate from "../middleware/schemaValidation.js";
import { updateUserProfileSchema } from "../validations/userValidation.js";
import authentication from "../middleware/authentication.js";
const userRouter = express.Router();

// This file defines the user related routes.


userRouter.get("/profile", authentication, getUserProfile);

userRouter.put("/update-profile", validate(updateUserProfileSchema), authentication, updateUserProfile);

export default userRouter;
