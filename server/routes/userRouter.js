import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/user.js";
const userRouter = express.Router();

userRouter.get("/profile", getUserProfile);
userRouter.put("/update-profile", updateUserProfile);

export default userRouter;
