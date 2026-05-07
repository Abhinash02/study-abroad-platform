const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");
const { comparePrograms } = require("../services/compare.service");

const compareProgramsController = asyncHandler(async (req, res) => {
  const { programIds, studentId } = req.query;

  const parsedIds = String(programIds || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  const result = await comparePrograms(parsedIds, studentId || req.user._id);

  return successResponse(
    res,
    result,
    "Programs compared successfully using weighted backend scoring."
  );
});

module.exports = {
  compareProgramsController,
};