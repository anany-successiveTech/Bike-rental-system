import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next({
        statusCode: 401,
        message: "Authorization failed or token not found",
      });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return next({ statusCode: 401, message: "Invalid or expired token" });
    }

    // Minimal verification only: do not call DB. Ensure token contains necessary fields.
    const userId = decoded.id || decoded._id || decoded.userId;
    const email = decoded.email || null;
    const role = decoded.role || null;
    const fullName = decoded.fullName || decoded.name || null;

    if (!userId && !email) {
      return next({
        statusCode: 401,
        message: "Invalid token payload: missing user identifier",
      });
    }

    // Attach user info directly from token payload (no DB lookup)
    req.user = {
      id: userId ? String(userId) : undefined,
      email,
      role,
      fullName,
    };

    return next();
  } catch (error) {
    console.error("authenticationChecker error:", error);
    return next({
      statusCode: 500,
      message: "Authentication failed",
      details: error,
    });
  }
};

export default authentication;
