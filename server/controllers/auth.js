// successResponse(res, message, data, statusCode);
// errorResponse(res, message, error, statusCode);

// Utility functions for sending standardized success and error responses and their usage example.

import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import jsonwebtoken for JWT handling
import dotenv from "dotenv";
import { errorResponse, successResponse } from "../utils/successResponse.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Register User
// Login User
// Password Reset
// Logout User

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      gender,
      address,
      role,
      businessName, // only if provider
      document, // only if provider
    } = req.body;

    // check existing user
    if (await User.findOne({ email })) {
      return successResponse(res, `User with ${email} already exists`, {}, 400);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // base user data (common for all)
    const userData = {
      firstName,
      lastName,
      email,
      mobileNumber,
      password: hashedPassword,
      gender,
      address,
      role,
    };

    // if provider → add provider-specific fields
    if (role === "provider") {
      userData.businessName = businessName;
      userData.document = document;
    }

    const user = await User.create(userData);

    // remove password for safety
    const safeUser = user.toObject();
    delete safeUser.password;

    return successResponse(
      res,
      "User registered successfully",
      { user: safeUser },
      201
    );
  } catch (error) {
    console.error("Register Error:", error.message);
    return errorResponse(res, "Registration failed", error, 500);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and explicitly select password field
    // "SELECT +password" is needed because in schema we have declared select: false for password field.

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return successResponse(res, "Invalid email or password", {}, 401);
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return successResponse(res, "Invalid email or password", {}, 401);
    }

    // Generate JWT token (use email and fullName in payload and attach role)
    const token = jwt.sign(
      { email: user.email, fullName: user.fullName, role: user.role },
      JWT_SECRET,
      { expiresIn: "10d" }
    );

    const loginData = {
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      token: token,
    };

    return successResponse(res, "Login successful", { user: loginData }, 200);
  } catch (error) {
    console.error("Login Error:", error.message);
    return errorResponse(res, "Login failed", error, 500);
  }
};

export const passwordReset = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // Find user by email and explicitly select password field
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return successResponse(res, "User not found", {}, 404);
    }

    // Compare old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return successResponse(res, "Invalid old password", {}, 401);
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return successResponse(
      res,
      "Password reset successful, login again",
      {},
      200
    );
  } catch (error) {
    console.error("Password Reset Error:", error.message);
    return errorResponse(res, "Password reset failed", error, 500);
  }
};

export const logoutUser = async (req, res) => {
  // Since we are using JWT which is stateless, logout can be handled on client side by simply deleting the token.
  // However i am adding this endpoint for completeness., later i will add logout from backend.
  try {
    return successResponse(res, "Logout successful", {}, 200);
  } catch (error) {
    console.error("Logout Error:", error.message);
    return errorResponse(res, "Logout failed", error, 500);
  }
};
