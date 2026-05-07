const express = require("express");
const {
  listUniversities,
  listPopularUniversities,
} = require("../controllers/university.controller");

const router = express.Router();

router.get("/", listUniversities);
router.get("/popular", listPopularUniversities);

module.exports = router;