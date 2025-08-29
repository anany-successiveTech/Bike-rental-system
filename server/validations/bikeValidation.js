import Joi from "joi";

// Validation for Adding a New Bike
export const addBikeSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Bike name is required",
  }),
  rating: Joi.number().min(0).max(5).default(0).messages({
    "number.min": "Rating must be at least 0",
    "number.max": "Rating must be at most 5",
  }),
  tripLimit: Joi.number().integer().min(0).default(0),
  securityDeposit: Joi.number().min(0).required().messages({
    "number.base": "Security deposit must be a number",
    "any.required": "Security deposit is required",
  }),
  rentPrice: Joi.number().min(0).required().messages({
    "number.base": "Rent price must be a number",
    "any.required": "Rent price is required",
  }),
  location: Joi.string().trim().required().messages({
    "string.empty": "Location is required",
  }),
  companyName: Joi.string().trim().required().messages({
    "string.empty": "Company name is required",
  }),
  vehicleRegistration: Joi.string().trim().uppercase().required().messages({
    "string.empty": "Vehicle registration is required",
  }),
});

// Validation for Updating Bike Details
export const updateBikeSchema = Joi.object({
  location: Joi.string().trim(),
  rentPrice: Joi.number().min(0),
  securityDeposit: Joi.number().min(0),
}).or("location", "rentPrice", "securityDeposit"); 
// ensures at least one field is provided

// Validation for Rating Bike
export const ratingSchema = Joi.object({
  vehicleRegistration: Joi.string().trim().uppercase().required().messages({
    "string.empty": "Vehicle registration is required",
  }),
  rating: Joi.number().min(0).max(5).required().messages({
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 0",
    "number.max": "Rating must be at most 5",
  }),
});
