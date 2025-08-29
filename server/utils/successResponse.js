// Utility functions for sending standardized success and error responses
// Success Response
export const successResponse = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Error Response
export const errorResponse = (res, message, error, statusCode = 500) => {
  const errorMessage = error?.message || String(error);

  return res.status(statusCode).json({
    success: false,
    message,
    error: {
      message: errorMessage,
    },
  });
};

// This way we dont have to repeat the structure in every controller.
// Usage of this utility functions :-
// We can just call successResponse(res, "User created", { user }) or errorResponse(res, "Failed to create user", error).
