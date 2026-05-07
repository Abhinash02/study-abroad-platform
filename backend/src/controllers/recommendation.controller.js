const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");
const { buildProgramRecommendations } = require("../services/recommendation.service");


const getRecommendations = asyncHandler(async (req, res) => {
  const payload = await buildProgramRecommendations(req.params.studentId);

  return successResponse(
    res,
    payload,
    "Recommendations generated successfully.",
    { implementation: "mongodb-aggregation" }
  );
});

module.exports = {
  getRecommendations,
};
