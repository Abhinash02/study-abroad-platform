const jwt = require("jsonwebtoken");
const env = require("../config/env");
const Student = require("../models/Student");
const asyncHandler = require("../utils/asyncHandler");
const HttpError = require("../utils/httpError");

const requireAuth = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new HttpError(401, "Authorization token missing.");
  }

  const token = header.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await Student.findById(decoded.sub).select("-password");

    if (!user) {
      throw new HttpError(401, "Authenticated user no longer exists.");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new HttpError(401, "Invalid or expired token.");
  }
});

module.exports = {
  requireAuth,
};
