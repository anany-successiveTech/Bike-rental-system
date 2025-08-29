import Joi from "joi";

// Register Schema (customer + provider support)
export const registerSchema = Joi.object({
  firstName: Joi.string().max(30).required(),
  lastName: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string()
    .pattern(/^[6-9]\d{9}$/) // Indian mobile number
    .required(),
  password: Joi.string().min(6).max(50).required(),
  gender: Joi.string().valid("male", "female", "other"),
  role: Joi.string().valid("customer", "provider").default("customer"),

  address: Joi.object({
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zipCode: Joi.string().pattern(/^\d{6}$/).required(), // Indian Pincode
  }).required(),

  businessName: Joi.string().max(100).when("role", {
    is: "provider",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),

// In this validation schema, the 'document' field is conditionally required based on the 'role' field.
// If the role is 'provider', the document object must be provided and must include valid PAN and Aadhaar numbers.
// If the role is 'customer', the document field is optional.
// The patterns for PAN, Aadhaar, GST, and registrationNo ensure that the provided values conform to expected formats {indian, formate of documents}.

  document: Joi.object({
    panNo: Joi.string()
      .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/) // PAN NUMBER.
      .when("..role", { is: "provider", then: Joi.required() }),

    aadhar: Joi.string()
      .pattern(/^[2-9]{1}[0-9]{11}$/) // Aadhaar NUMBER
      .when("..role", { is: "provider", then: Joi.required() }),

    GST: Joi.string().pattern(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    ), // GSTIN

    registrationNo: Joi.string().pattern(/^[A-Z]{2}[0-9]{2}\d{11}$/), // RTO Reg No.
  }).when("role", {
    is: "provider",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

// Login Schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Password Reset Schema
export const passwordResetSchema = Joi.object({
  email: Joi.string().email().required(),
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});
