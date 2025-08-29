import rateLimit from "express-rate-limit";

// Default global limiter: 100 requests per 15 minutes per IP
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    statusCode: 429,
    message: "Too many requests, please try again later.",
  },
});

// Factory to create custom limiters for specific routes
export const createRateLimiter = (options = {}) =>
  rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000,
    max: options.max || 100,
    standardHeaders:
      options.standardHeaders !== undefined ? options.standardHeaders : true,
    legacyHeaders:
      options.legacyHeaders !== undefined ? options.legacyHeaders : false,      
    message: options.message || {
      success: false,
      statusCode: 429,
      message: "Too many requests, please try again later.",
    },
  });

export default rateLimiter;