import Joi from "joi";

// Create Booking Validation
export const createBookingSchema = Joi.object({
  vehicleRegistration: Joi.string().trim().uppercase().required().messages({
    "string.empty": "Vehicle registration is required",
    "any.required": "Vehicle registration is required",
  }),
  startDate: Joi.date().required().messages({
    "date.base": "startDate must be a valid date",
    "any.required": "startDate is required",
  }),
  endDate: Joi.date().required().messages({
    "date.base": "endDate must be a valid date",
    "any.required": "endDate is required",
  }),
  rentedPrice: Joi.number().min(0).required().messages({
    "number.base": "rentedPrice must be a number",
    "any.required": "rentedPrice is required",
  }),
  kilometers: Joi.number().min(0).optional(),
  bikeImage: Joi.string().uri().optional().messages({
    "string.uri": "bikeImage must be a valid URL",
  }),
  status: Joi.string()
    .valid("pending", "confirm", "cancelled", "complete")
    .optional(),
});

// Update Booking Status Validation
export const updateBookingStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "confirm", "cancelled", "complete")
    .required()
    .messages({
      "any.only":
        "Status must be one of: pending, confirm, cancelled, complete",
      "any.required": "Status is required",
    }),
});

// Optional: Get Bookings with filters (if needed in future)
// export const getBookingsQuerySchema = Joi.object({
//   startDate: Joi.date().optional(),
//   endDate: Joi.date().optional(),
//   status: Joi.string().valid("pending", "confirm", "cancelled", "complete"),
// });
