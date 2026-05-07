const Application = require("../models/Application");
const Program = require("../models/Program");
const Student = require("../models/Student");
const cacheService = require("../services/cache.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

const getOverview = asyncHandler(async (req, res) => {
  const cacheKey = "dashboard-overview";
  const cached = cacheService.get(cacheKey);

  if (cached) {
    return successResponse(res, cached, "Dashboard overview fetched.", {
      cache: "hit",
    });
  }

  const [totalStudents, totalPrograms, totalApplications, statusBreakdown, topCountries] =
    await Promise.all([
      Student.countDocuments(),
      Program.countDocuments(),
      Application.countDocuments(),
      Application.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Application.aggregate([
        { $group: { _id: "$destinationCountry", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
    ]);

  const payload = {
    totalStudents,
    totalPrograms,
    totalApplications,
    statusBreakdown,
    topCountries,
  };

  cacheService.set(cacheKey, payload);

  return successResponse(res, payload, "Dashboard overview fetched.", {
    cache: "miss",
  });
});

module.exports = {
  getOverview,
};
