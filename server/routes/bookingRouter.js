import express from "express";
import { createBooking, getBikeBookings, updateBookingStatus } from "../controllers/booking.js";
const bookingRouter = express.Router();

bookingRouter.post("/book-bike", createBooking);
bookingRouter.get("/see-bookings", getBikeBookings);
bookingRouter.put("/update-booking/:id", updateBookingStatus);


export default bookingRouter;
// This file defines the booking routes for creating and retrieving bike bookings using Express.js.