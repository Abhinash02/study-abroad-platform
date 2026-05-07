function parsePagination(query) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 10, 1), 50);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

function parseBoolean(value) {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

function parseCsv(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSort(sortBy, allowedSorts, fallbackKey) {
  if (!sortBy || !allowedSorts[sortBy]) {
    return {
      sortKey: fallbackKey,
      sortValue: allowedSorts[fallbackKey],
    };
  }

  return {
    sortKey: sortBy,
    sortValue: allowedSorts[sortBy],
  };
}

module.exports = {
  parsePagination,
  parseBoolean,
  parseCsv,
  parseSort,
};