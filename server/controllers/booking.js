import Booking from "../models/bikeBookings.js";
import Bike from "../models/bikes.js";
import { errorResponse, successResponse } from "../utils/successResponse.js";

// These functions assume that authentication middleware has set req.user with the authenticated user's info.

// Create a new booking


export const createBooking = async (req, res) => {
  try {
    const {
      vehicleRegistration,
      startDate,
      endDate,
      rentedPrice,
      kilometers,
      status,
      bikeImage,
    } = req.body;

    // Use userId directly assuming authentication middleware has set it
    // const userId = req.user?.id;
    const userId = "64fb1234abcd5678ef901234"; // replace with a real ObjectId from your 'users' collection

    if (!vehicleRegistration) {
      return errorResponse(res, "vehicleRegistration is required", null, 400);
    }

    // Validate dates
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
      return errorResponse(res, "Invalid startDate or endDate", null, 400);
    }

    if (parsedStartDate > parsedEndDate) {
      return errorResponse(
        res,
        "startDate must be before or equal to endDate",
        null,
        400
      );
    }

    // Find bike by vehicleRegistration
    const bike = await Bike.findOne({ vehicleRegistration });
    if (!bike) {
      return errorResponse(res, "Bike not found", null, 404);
    }

    // Check for overlapping bookings
    const overlapping = await Booking.findOne({
      bike: bike._id,
      startDate: { $lte: parsedEndDate },
      endDate: { $gte: parsedStartDate },
      status: { $in: ["pending", "confirm", "ongoing"] },
    });

    if (overlapping) {
      return errorResponse(
        res,
        "Bike is already booked for the selected dates",
        null,
        409
      );
    }

    // Create booking
    const newBooking = await Booking.create({
      bike: bike._id,
      user: userId, // Trusted from middleware
      bikeImage,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
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

export const getBikeBookings = async (req, res) => {
  try {
    const bikeId = req.params.id;

    // If a specific bike id is provided, return bookings for that bike (existing behavior)
    if (bikeId) {
      const bookings = await Booking.find({ bike: bikeId }).populate("user");
      return successResponse(res, "Bookings fetched", { bookings }, 200);
    }

    // Otherwise return the distinct bikes that appear in the bookings collection
    const bikeIds = await Booking.distinct("bike");
    if (!bikeIds || bikeIds.length === 0) {
      return successResponse(
        res,
        "No bikes found in bookings",
        { bikes: [] },
        200
      );
    }

    const bikes = await Bike.find({ _id: { $in: bikeIds } });
    return successResponse(res, "Bikes fetched from bookings", { bikes }, 200);
  } catch (error) {
    return errorResponse(res, "Failed to fetch bookings", error, 500);
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;

    // Basic validation
    if (!bookingId) {
      return errorResponse(res, "Booking ID is required in URL", null, 400);
    }

    if (!status) {
      return errorResponse(
        res,
        "Status is required in request body",
        null,
        400
      );
    }

    // Normalize and validate status
    const allowedStatuses = ["pending", "confirmed", "cancel", "complete"];
    const normalizedStatus = String(status).toLowerCase().trim();

    if (!allowedStatuses.includes(normalizedStatus)) {
      return errorResponse(
        res,
        `Invalid status. Allowed: ${allowedStatuses.join(", ")}`,
        null,
        400
      );
    }

    // Update booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: normalizedStatus },
      { new: true }
    ).populate("user bike");

    if (!updatedBooking) {
      return errorResponse(res, "Booking not found", null, 404);
    }

    return successResponse(
      res,
      "Booking status updated",
      { booking: updatedBooking },
      200
    );
  } catch (error) {
    console.error("Update Booking Status Error:", error);
    return errorResponse(res, "Failed to update booking status", error, 500);
  }
};
