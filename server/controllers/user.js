import User from "../models/users.js";
import { errorResponse, successResponse } from "../utils/successResponse.js";

export const getUserProfile = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });
    if (!user) {
      return successResponse(res, "User not found", {}, 404);
    }
    return successResponse(res, "User profile fetched", { user }, 200);
  } catch (error) {
    console.error("Get User Profile Error:", error.message);
    return errorResponse(res, "Failed to fetch user profile", error, 500);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { email, mobileNumber, address } = req.body;
    if (!email) {
      return successResponse(
        res,
        "Email is required to update profile",
        {},
        400
      );
    }
    const user = await User.findOneAndUpdate(
      { email },
      { mobileNumber, address },
      { new: true }
    );
    if (!user) {
      return successResponse(res, "User not found", {}, 404);
    }
    return successResponse(res, "User profile updated", { user }, 200);
  } catch (error) {
    console.error("Error updating profile:", error);
    return errorResponse(
      res,
      "Server error while updating profile.",
      error,
      500
    );
  }
};
