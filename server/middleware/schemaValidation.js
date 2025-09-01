import { errorResponse } from "../utils/successResponse.js";

// const validate = (schema) => {
//   return (req, res, next) => {
//     const options = {
//       abortEarly: false, // return all errors
//       allowUnknown: false, // disallow extra fields
//       stripUnknown: true, // remove unknown fields
//     };

//     const { error, value } = schema.validate(req.body, options);

//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation error",
//         details: error.details.map((err) => err.message),
//       });
//     } else {
//       req.body = value; // sanitized data
//       next();
//     }
//   };
// };

export default function validate(schema) {
  return (err, req, res, next) => {
    console.log('calling validate middleware')
    const { error } = schema.validate(req.body, { abortEarly: false }); // This will return all errors, not just the first one, wait to collect all errors.

    if (error) {
      return errorResponse(
        res,
        "Validation failed",
        { message: error.details.map((err) => err.message) }, // pass all messages
        400
      );
    }

    next(err);
  };
}

// export default validate;
