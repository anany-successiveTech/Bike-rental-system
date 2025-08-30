import Joi from "joi";

// Address schema (nested object)
const addressSchema = Joi.object({
  city: Joi.string().trim().max(50).messages({
    "string.max": "City name too long",
  }),
  state: Joi.string().trim().max(50),
  country: Joi.string().trim().max(50),
  zipCode: Joi.string().trim().max(10).pattern(/^[0-9]{4,10}$/).messages({
    "string.pattern.base": "Zip code must be numeric and 4– digits",
  }),
});

// Update profile schema
export const updateUserProfileSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),

  mobileNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .messages({
      "string.pattern.base": "Mobile number must be exactly 10 digits",
    }),

  address: addressSchema,
}).or("mobileNumber", "address"); 
// ensures at least one field is provided besides email
