import Booking from "../models/history.js";
import Bike from "../models/bikes.js";
import { errorResponse, successResponse } from "../utils/successResponse.js";
import mongoose from "mongoose";

// Create a booking
export const createBooking = async (req, res) => {
  try {
    const { bikeId, fromDate, toDate } = req.body;
    const userId = req.user && req.user.id;

    if (!bikeId || !fromDate || !toDate) {
      return errorResponse(res, "bikeId, fromDate and toDate are required", null, 400);
    }

    if (!mongoose.Types.ObjectId.isValid(bikeId)) {
      return errorResponse(res, "Invalid bikeId", null, 400);
    }

    const bike = await Bike.findById(bikeId);
    if (!bike) return errorResponse(res, "Bike not found", null, 404);

    // Check availability (very basic: ensure no overlapping booking)
    const overlapping = await Booking.findOne({
      bike: bikeId,
      $or: [
        { from: { $lte: new Date(toDate) }, to: { $gte: new Date(fromDate) } },
      ],
    });
    if (overlapping) return errorResponse(res, "Bike already booked for given dates", null, 409);

    const booking = await Booking.create({
      bike: bikeId,
      user: userId,
      from: new Date(fromDate),
      to: new Date(toDate),
      status: "booked",
    });

    return successResponse(res, "Booking created", { booking }, 201);
  } catch (error) {
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
