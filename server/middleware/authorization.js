import { errorResponse } from "../utils/successResponse.js";
import User from "../models/users.js";

// authorize('customer') or authorize(['customer','provider'])
const authorize = (allowedRoles = []) => {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, "Authentication required", null, 401);
    }

    // if no roles provided, allow any authenticated user
    if (roles.length === 0) return next();

    // Filter allowed roles to only those defined in schema
    const validRoles = roles.filter((r) => schemaRoles.includes(r));
    if (validRoles.length === 0) {
      return errorResponse(
        res,
        "Server authorization misconfiguration: invalid role(s)",
        null,
        500
      );
    }

    if (!validRoles.includes(req.user.role)) {
      return errorResponse(
        res,
        "Forbidden: insufficient privileges",
        null,
        403
      );
    }

    return next();
  };
};

export default authorize;
