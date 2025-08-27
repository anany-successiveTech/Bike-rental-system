import Bike from "../models/bikes.js";
import { errorResponse, successResponse } from "../utils/successResponse.js";

// addBike: handles single image upload (field name: 'image')
export const addBike = async (req, res) => {
  try {
    const { name, tripLimit, securityDeposit, rentPrice, location, vehicleRegistration } = req.body;
    const owner = req.user && req.user.id;

    // if (!image) return errorResponse(res, "Image is required", null, 400);

    const bike = await Bike.create({
      name,
      tripLimit,
      securityDeposit,
      rentPrice,
      location,
      vehicleRegistration,
      // image,
      owner,
    });

    return successResponse(res, "Bike added successfully", { bike }, 201);
  } catch (error) {
    return errorResponse(res, "Failed to add bike", error, 500);
  }
};

export const getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find().populate(
      "owner",
      "firstName lastName email"
    );
    return successResponse(res, "Bikes fetched successfully", { bikes }, 200);
  } catch (error) {
    return errorResponse(res, "Failed to fetch bikes", error, 500);
  }
};
