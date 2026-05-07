const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

const getHealth = asyncHandler(async (req, res) => {
  return successResponse(res, {
    service: "waygood-evaluation-api",
    timestamp: new Date().toISOString(),
    status: "ok",
  });
});

module.exports = {
  getHealth,
};
