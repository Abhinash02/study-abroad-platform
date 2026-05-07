const Program = require("../models/Program");
const asyncHandler = require("../utils/asyncHandler");
const { paginatedResponse } = require("../utils/apiResponse");
const {
  parseBoolean,
  parsePagination,
  parseCsv,
  parseSort,
} = require("../utils/query");

const listPrograms = asyncHandler(async (req, res) => {
  const {
    country,
    field,
    intake,
    degreeLevel,
    scholarshipAvailable,
    minTuition,
    maxTuition,
    maxIelts,
    stem,
    q,
    sortBy,
  } = req.query;

  const { page, limit, skip } = parsePagination(req.query);
  const filters = {};

  if (country) {
    const countries = parseCsv(country);
    filters.country = countries.length > 1 ? { $in: countries } : countries[0];
  }

  if (field) {
    const fields = parseCsv(field);
    filters.field = fields.length > 1 ? { $in: fields } : fields[0];
  }

  if (degreeLevel) {
    const levels = parseCsv(degreeLevel);
    filters.degreeLevel = levels.length > 1 ? { $in: levels } : levels[0];
  }

  if (intake) {
    const intakes = parseCsv(intake);
    filters.intakes = { $in: intakes };
  }

  const scholarshipFlag = parseBoolean(scholarshipAvailable);
  if (typeof scholarshipFlag === "boolean") {
    filters.scholarshipAvailable = scholarshipFlag;
  }

  const stemFlag = parseBoolean(stem);
  if (typeof stemFlag === "boolean") {
    filters.stem = stemFlag;
  }

  if (minTuition || maxTuition) {
    filters.tuitionFeeUsd = {};
    if (minTuition) filters.tuitionFeeUsd.$gte = Number(minTuition);
    if (maxTuition) filters.tuitionFeeUsd.$lte = Number(maxTuition);
  }

  if (maxIelts) {
    filters.minimumIelts = { $lte: Number(maxIelts) };
  }

  if (q) {
    filters.$or = [
      { title: { $regex: q, $options: "i" } },
      { universityName: { $regex: q, $options: "i" } },
      { field: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } },
    ];
  }

  const allowedSorts = {
    relevance: { scholarshipAvailable: -1, tuitionFeeUsd: 1, createdAt: -1 },
    tuitionAsc: { tuitionFeeUsd: 1, title: 1 },
    tuitionDesc: { tuitionFeeUsd: -1, title: 1 },
    ieltsAsc: { minimumIelts: 1, tuitionFeeUsd: 1 },
    durationAsc: { durationMonths: 1, tuitionFeeUsd: 1 },
    latest: { createdAt: -1 },
    titleAsc: { title: 1 },
    titleDesc: { title: -1 },
  };

  const { sortKey, sortValue } = parseSort(sortBy, allowedSorts, "relevance");

  const [programs, total] = await Promise.all([
    Program.find(filters).sort(sortValue).skip(skip).limit(limit).lean(),
    Program.countDocuments(filters),
  ]);

  return paginatedResponse(res, programs, {
    message: "Programs fetched successfully.",
    page,
    limit,
    total,
    filters: req.query,
    sort: { by: sortKey, order: sortValue },
  });
});

module.exports = {
  listPrograms,
};