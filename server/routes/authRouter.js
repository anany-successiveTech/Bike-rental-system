import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  passwordReset,
} from "../controllers/auth.js";
import validate from "../middleware/schemaValidation.js";
import {
  registerSchema,
  loginSchema,
  passwordResetSchema,
} from "../validations.js/authValidation.js";
import authentication from "../middleware/authentication.js";
const authrouter = express.Router();

authrouter.post("/register", validate(registerSchema), registerUser);

authrouter.post("/login", validate(loginSchema), loginUser);

authrouter.post("/logout", logoutUser); // We are not validating logout as it doesn't require right now, it can be done in future if needed.

authrouter.post(
  "/password-reset",
  validate(passwordResetSchema),
  authentication,
  passwordReset
);

export default authrouter;

// This file defines the authentication routes for user registration and login using Express.js.
