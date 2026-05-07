// const University = require("../models/University");
// const cacheService = require("../services/cache.service");
// const asyncHandler = require("../utils/asyncHandler");
// const { successResponse } = require("../utils/apiResponse");
// const { parseBoolean, parsePagination } = require("../utils/query");

// const listUniversities = asyncHandler(async (req, res) => {
//   const {
//     country,
//     partnerType,
//     q,
//     scholarshipAvailable,
//     sortBy = "popular",
//   } = req.query;

//   const { page, limit, skip } = parsePagination(req.query);
//   const filters = {};

//   if (country) filters.country = country;
//   if (partnerType) filters.partnerType = partnerType;

//   const scholarshipFlag = parseBoolean(scholarshipAvailable);
//   if (typeof scholarshipFlag === "boolean") {
//     filters.scholarshipAvailable = scholarshipFlag;
//   }

//   if (q) {
//     filters.$text = { $search: q };
//   }

//   const sortMap = {
//     name: { name: 1 },
//     ranking: { qsRanking: 1, popularScore: -1 },
//     popular: { popularScore: -1, qsRanking: 1 },
//   };

//   const [items, total] = await Promise.all([
//     University.find(filters)
//       .sort(sortMap[sortBy] || sortMap.popular)
//       .skip(skip)
//       .limit(limit)
//       .lean(),
//     University.countDocuments(filters),
//   ]);

//   return successResponse(res, items, "Universities fetched successfully.", {
//     page,
//     limit,
//     total,
//     totalPages: Math.ceil(total / limit),
//     filters: req.query,
//   });
// });

// const listPopularUniversities = asyncHandler(async (req, res) => {
//   const cacheKey = "popular-universities";
//   const cachedPayload = cacheService.get(cacheKey);

//   if (cachedPayload) {
//     return successResponse(res, cachedPayload, "Popular universities fetched.", {
//       cache: "hit",
//     });
//   }

//   const universities = await University.find()
//     .sort({ popularScore: -1, qsRanking: 1 })
//     .limit(6)
//     .lean();

//   cacheService.set(cacheKey, universities);

//   return successResponse(res, universities, "Popular universities fetched.", {
//     cache: "miss",
//   });
// });

// module.exports = {
//   listUniversities,
//   listPopularUniversities,
// };

const University = require("../models/University");
const cacheService = require("../services/cache.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, paginatedResponse } = require("../utils/apiResponse");
const {
  parseBoolean,
  parsePagination,
  parseCsv,
  parseSort,
} = require("../utils/query");

const listUniversities = asyncHandler(async (req, res) => {
  const {
    country,
    partnerType,
    scholarshipAvailable,
    q,
    minRanking,
    maxRanking,
    tags,
    sortBy,
  } = req.query;

  const { page, limit, skip } = parsePagination(req.query);
  const filters = {};

  if (country) {
    const countries = parseCsv(country);
    filters.country = countries.length > 1 ? { $in: countries } : countries[0];
  }

  if (partnerType) {
    const partnerTypes = parseCsv(partnerType);
    filters.partnerType =
      partnerTypes.length > 1 ? { $in: partnerTypes } : partnerTypes[0];
  }

  const scholarshipFlag = parseBoolean(scholarshipAvailable);
  if (typeof scholarshipFlag === "boolean") {
    filters.scholarshipAvailable = scholarshipFlag;
  }

  if (minRanking || maxRanking) {
    filters.qsRanking = {};
    if (minRanking) filters.qsRanking.$gte = Number(minRanking);
    if (maxRanking) filters.qsRanking.$lte = Number(maxRanking);
  }

  const parsedTags = parseCsv(tags);
  if (parsedTags.length) {
    filters.tags = { $in: parsedTags };
  }

  if (q) {
    filters.$or = [
      { name: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } },
      { city: { $regex: q, $options: "i" } },
      { tags: { $elemMatch: { $regex: q, $options: "i" } } },
    ];
  }

  const allowedSorts = {
    popular: { popularScore: -1, qsRanking: 1, name: 1 },
    rankingAsc: { qsRanking: 1, name: 1 },
    rankingDesc: { qsRanking: -1, name: 1 },
    nameAsc: { name: 1 },
    nameDesc: { name: -1 },
    latest: { createdAt: -1 },
  };

  const { sortKey, sortValue } = parseSort(sortBy, allowedSorts, "popular");

  const [universities, total] = await Promise.all([
    University.find(filters).sort(sortValue).skip(skip).limit(limit).lean(),
    University.countDocuments(filters),
  ]);

  return paginatedResponse(res, universities, {
    message: "Universities fetched successfully.",
    page,
    limit,
    total,
    filters: req.query,
    sort: { by: sortKey, order: sortValue },
  });
});

const listPopularUniversities = asyncHandler(async (req, res) => {
  const cacheKey = "popular-universities";
  const cachedPayload = cacheService.get(cacheKey);

  if (cachedPayload) {
    return successResponse(res, cachedPayload, "Popular universities fetched.", {
      cache: "hit",
    });
  }

  const universities = await University.find()
    .sort({ popularScore: -1, qsRanking: 1, name: 1 })
    .limit(6)
    .lean();

  cacheService.set(cacheKey, universities);

  return successResponse(res, universities, "Popular universities fetched.", {
    cache: "miss",
  });
});

module.exports = {
  listUniversities,
  listPopularUniversities,
};