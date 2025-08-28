import Booking from "../models/bikeBookings";
import Bike from "../models/bikes.js";
import { errorResponse, successResponse } from "../utils/successResponse.js";

export const createBooking = async (req, res) => {
  try {
    const {
      bikeId,
      startDate: startDateRaw,
      endDate: endDateRaw,
      rentedPrice,
      kilometers,
      status,
      bikeImage,
    } = req.body;

    const userId = req.user && req.user.id;
    if (!userId) {
      return errorResponse(res, "Authentication required", null, 401);
    }

    if (!bikeId) {
      return errorResponse(res, "bikeId is required", null, 400);
    }

    // parse and validate dates
    const startDate = new Date(startDateRaw);
    const endDate = new Date(endDateRaw);
    if (isNaN(startDate) || isNaN(endDate)) {
      return errorResponse(res, "Invalid startDate or endDate", null, 400);
    }

    if (startDate > endDate) {
      return errorResponse(
        res,
        "startDate must be before or equal to endDate",
        null,
        400
      );
    }

    const now = new Date();
    if (endDate < now) {
      return errorResponse(res, "endDate must be in the future", null, 400);
    }

    // ensure bike exists
    const bike = await Bike.findById(bikeId);
    if (!bike) {
      return errorResponse(res, "Bike not found", null, 404);
    }

    // check for overlapping bookings for same bike
    const overlapping = await Booking.findOne({
      bike: bikeId,
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
      status: { $in: ["pending", "confirmed", "ongoing"] },
    });

    if (overlapping) {
      return errorResponse(
        res,
        "Bike is already booked for the selected dates",
        null,
        409
      );
    }

    // validate numeric fields if provided
    if (
      rentedPrice !== undefined &&
      (isNaN(Number(rentedPrice)) || Number(rentedPrice) < 0)
    ) {
      return errorResponse(res, "Invalid rentedPrice", null, 400);
    }

    if (
      kilometers !== undefined &&
      (isNaN(Number(kilometers)) || Number(kilometers) < 0)
    ) {
      return errorResponse(res, "Invalid kilometers", null, 400);
    }

    const newBooking = await Booking.create({
      bike: bikeId,
      user: userId,
      bikeImage,
      startDate,
      endDate,
      kilometers: kilometers !== undefined ? Number(kilometers) : undefined,
      rentedPrice: rentedPrice !== undefined ? Number(rentedPrice) : undefined,
      status: status || "pending",
    });

    return successResponse(
      res,
      "Booking created successfully",
      { newBooking },
      201
    );
  } catch (error) {
    console.error("Create Booking Error:", error);
    return errorResponse(res, "Failed to create booking", error, 500);
  }
};

export const getBookingsForUser = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const bookings = await Booking.find({ user: userId }).populate("bike");
    return successResponse(res, "Bookings fetched", { bookings }, 200);
  } catch (error) {
    return errorResponse(res, "Failed to fetch bookings", error, 500);
  }
};
