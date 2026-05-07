// const asyncHandler = require("../utils/asyncHandler");
// const { successResponse } = require("../utils/apiResponse");
// const { registerUser, loginUser } = require("../services/auth.service");
// const { signToken } = require("../utils/jwt");
// const sanitizeUser = require("../utils/sanitizeUser");

// const register = asyncHandler(async (req, res) => {
//   const user = await registerUser(req.body);
//   const token = signToken(user);

//   return successResponse(
//     res,
//     {
//       user: sanitizeUser(user),
//       token,
//     },
//     "Registration successful."
//   );
// });

// const login = asyncHandler(async (req, res) => {
//   const user = await loginUser(req.body.email, req.body.password);
//   const token = signToken(user);

//   return successResponse(
//     res,
//     {
//       user: sanitizeUser(user),
//       token,
//     },
//     "Login successful."
//   );
// });

// const me = asyncHandler(async (req, res) => {
//   return successResponse(res, sanitizeUser(req.user), "Authenticated user profile fetched.");
// });

// module.exports = {
//   register,
//   login,
//   me,
// };



// const asyncHandler = require("../utils/asyncHandler");
// const { successResponse } = require("../utils/apiResponse");
// const { registerUser, loginUser } = require("../services/auth.service");
// const { signToken } = require("../utils/jwt");
// const sanitizeUser = require("../utils/sanitizeUser");

// const register = asyncHandler(async (req, res) => {
//   const user = await registerUser(req.body);
//   const token = signToken(user);

//   return successResponse(
//     res,
//     {
//       user: sanitizeUser(user),
//       token,
//     },
//     "Registration successful."
//   );
// });

// const login = asyncHandler(async (req, res) => {
//   const user = await loginUser(req.body.email, req.body.password);
//   const token = signToken(user);

//   return successResponse(
//     res,
//     {
//       user: sanitizeUser(user),
//       token,
//     },
//     "Login successful."
//   );
// });

// const me = asyncHandler(async (req, res) => {
//   return successResponse(res, sanitizeUser(req.user), "Authenticated user profile fetched.");
// });

// module.exports = {
//   register,
//   login,
//   me,
// };

const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");
const { registerUser, loginUser } = require("../services/auth.service");
const { signToken } = require("../utils/jwt");
const sanitizeUser = require("../utils/sanitizeUser");
const Student = require("../models/Student");
const HttpError = require("../utils/httpError");

const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  const token = signToken(user);

  return successResponse(
    res,
    {
      user: sanitizeUser(user),
      token,
    },
    "Registration successful."
  );
});

const login = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body.email, req.body.password);
  const token = signToken(user);

  return successResponse(
    res,
    {
      user: sanitizeUser(user),
      token,
    },
    "Login successful."
  );
});

const me = asyncHandler(async (req, res) => {
  return successResponse(res, sanitizeUser(req.user), "Authenticated user profile fetched.");
});

const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = [
    "fullName",
    "targetCountries",
    "interestedFields",
    "preferredIntake",
    "maxBudgetUsd",
    "englishTest",
  ];

  const updates = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  if (
    updates.englishTest &&
    typeof updates.englishTest.score !== "number"
  ) {
    throw new HttpError(400, "English test score must be a number.");
  }

  const profileComplete = Boolean(
    (updates.targetCountries || req.user.targetCountries || []).length &&
      (updates.interestedFields || req.user.interestedFields || []).length &&
      (updates.preferredIntake || req.user.preferredIntake) &&
      Number(
        updates.maxBudgetUsd !== undefined
          ? updates.maxBudgetUsd
          : req.user.maxBudgetUsd
      ) > 0
  );

  updates.profileComplete = profileComplete;

  const updatedUser = await Student.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  return successResponse(
    res,
    sanitizeUser(updatedUser),
    "Profile updated successfully."
  );
});

module.exports = {
  register,
  login,
  me,
  updateProfile,
};