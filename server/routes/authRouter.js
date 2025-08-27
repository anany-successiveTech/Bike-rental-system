import express from "express";
import { registerUser, loginUser, logoutUser, passwordReset } from "../controllers/auth.js";
const authrouter = express.Router();

authrouter.post("/register", registerUser);
authrouter.post("/login", loginUser);
authrouter.post("/logout", logoutUser);
authrouter.post("/password-reset", passwordReset);

export default authrouter;

// This file defines the authentication routes for user registration and login using Express.js.