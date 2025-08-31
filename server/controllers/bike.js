import Bike from "../models/bikes.js";
import { errorResponse, successResponse } from "../utils/successResponse.js";

// addBike: handles single image upload (field name: 'image')

export const addBike = async (req, res) => {
  try {
    const {
      name,
      tripLimit,
      rating,
      securityDeposit,
      rentPrice,
      location,
      companyName,
      bikeImage,
      vehicleRegistration,
    } = req.body;
    const owner = req.user && req.user.id;

    if (!image) return errorResponse(res, "Image is required", null, 400);

    const bike = await Bike.create({
      name,
      tripLimit,
      securityDeposit,
      rentPrice,
      rating,
      location,
      companyName,
      vehicleRegistration,
      bikeImage,
      owner,
    });

    return successResponse(res, "Bike added successfully", { bike }, 201);
  } catch (error) {
    return errorResponse(res, "Failed to add bike", error, 500);
  }
};

export const getAllBikes = async (req, res) => {
  try {
    const { location, bikeName, companyName, sortBy, order } = req.query;
    console.log(companyName);

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    if (location && location.trim()) {
      filter.location = { $regex: location.trim(), $options: "i" }; // case-insensitive match
    }
    if (bikeName && bikeName.trim()) {
      filter.bikeName = { $regex: bikeName.trim(), $options: "i" };
    }
    if (companyName && companyName.trim()) {
      filter.companyName = { $regex: companyName.trim(), $options: "i" };
    }

    // Build sort object
    // sortBy can be 'rentPrice' or any other sortable field
    // order can be 'asc' or 'desc', default to ascending
    const sortOptions = {};
    if (sortBy) {
      const sortOrder = order === "desc" ? -1 : 1;
      sortOptions[sortBy] = sortOrder;
    }

    // Get total count of filtered bikes
    const total = await Bike.countDocuments(filter);

    // Fetch bikes with filter, sorting, and pagination
    const bikes = await Bike.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit);

    return successResponse(
      res,
      "Bikes fetched successfully",
      {
        bikes,
        meta: { page, limit, total, totalPages },
      },
      200
    );
  } catch (error) {
    return errorResponse(res, "Failed to fetch bikes", error, 500);
  }
};

export const updateBikeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, rentPrice, securityDeposit } = req.body;

    const updates = {};

    if (location !== undefined) updates.location = location;
    if (rentPrice !== undefined) updates.rentPrice = rentPrice;
    if (securityDeposit !== undefined)
      updates.securityDeposit = securityDeposit;

    // This check will ensure that at least one of the allowed fields is being updated.
    // It will prevent empty updates.

    if (Object.keys(updates).length === 0) {
      return errorResponse(
        res,
        "No updatable fields provided. Allowed: location, rentPrice, securityDeposit",
        null,
        400
      );
    }

    const updatedBike = await Bike.findOneAndUpdate(
      { vehicleRegistration: id }, // Search by vehicleRegistration in the db.
      { $set: updates }, // This will only update the fields present in updates object.
      { new: true, runValidators: true } // Return the updated document and run schema validators, otherwise mongoose won't validate updates and return old document by default.
    );

    if (!updatedBike) {
      return errorResponse(res, "Bike not found", null, 404);
    }

    return successResponse(
      res,
      "Bike updated successfully",
      { bike: updatedBike },
      200
    );
  } catch (error) {
    return errorResponse(res, "Failed to update bike", error, 500);
  }
};

export const deleteBike = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBike = await Bike.findOneAndDelete({
      vehicleRegistration: id,
    });

    if (!deletedBike) {
      return errorResponse(res, "Bike not found", null, 404);
    }

    return successResponse(res, "Bike deleted successfully", {}, 200);
  } catch (error) {
    return errorResponse(res, "Failed to delete bike", error, 500);
  }
};

export const bikeRating = async (req, res) => {
  try {
    const { rating, vehicleRegistration } = req.body;
    console.log(rating, vehicleRegistration);

    if (rating === undefined || rating < 0 || rating > 5) {
      return errorResponse(res, "Rating must be between 0 and 5", null, 400);
    }

    const bike = await Bike.findOneAndUpdate(
      { vehicleRegistration },
      { $set: { rating } },
      { new: true, runValidators: true }
    );
    if (!bike) {
      return errorResponse(res, "Bike not found", null, 404);
    }

    bike.rating = rating;
    await bike.save();

    return successResponse(
      res,
      "Bike rating updated successfully",
      { bike },
      200
    );
  } catch (error) {
    return errorResponse(res, "Failed to update bike rating", error, 500);
  }
};

