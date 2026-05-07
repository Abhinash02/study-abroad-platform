function successResponse(res, data, message = "Request successful", meta = {}) {
  return res.status(200).json({
    success: true,
    message,
    data,
    meta,
  });
}

function paginatedResponse(res, data, options = {}) {
  const {
    message = "Request successful",
    page = 1,
    limit = 10,
    total = 0,
    filters = {},
    sort = {},
  } = options;

  return res.status(200).json({
    success: true,
    message,
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
      filters,
      sort,
    },
  });
}

module.exports = {
  successResponse,
  paginatedResponse,
};