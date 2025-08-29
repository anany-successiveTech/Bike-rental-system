import express from "express";
import { createBooking, getBikeBookings, updateBookingStatus } from "../controllers/booking.js";
import { createBookingSchema, updateBookingStatusSchema } from "../validations/bookingValidation.js";
import validate from "../middleware/schemaValidation.js";
import authentication from "../middleware/authentication.js";

const bookingRouter = express.Router();

bookingRouter.post("/book-bike", validate(createBookingSchema), authentication, createBooking);

bookingRouter.get("/see-bookings", authentication, getBikeBookings);

bookingRouter.put("/update-booking/:id", validate(updateBookingStatusSchema), authentication, updateBookingStatus); // ONLY FOR ADMIN.

export default bookingRouter;
// This file defines the booking routes for creating and retrieving bike bookings using Express.js.