import errorMessages from "../utils/errorMessages.js";

const handleGlobalError = (err, _, res, next) => {
  const statusCode = (err && err.statusCode) || 500;
  const message =
    (err && err.message) || errorMessages[statusCode] || "Unexpected error";

  // It will log full error stack (developer project).
  // and avoid logging sensitive information, this is very important.(i will handle it later).

  console.error(err && err.stack);

  const payload = {
    success: false,
    statusCode,
    message,
  };

  if (err && err.details && process.env.NODE_ENV !== "production") {
    payload.details = err.details;
  }

  return res.status(statusCode).json(payload);
};

export default handleGlobalError;

// Whenever next(err) is called in any request/api, this middleware will catch the error.
// This is how we handle the global errors, "learned in the backend assignment".
// It receives (err, req, res, next) and returns a JSON response.
// Use next(err) in controllers/middleware to forward errors here.
