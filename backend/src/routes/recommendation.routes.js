const express = require("express");
const { getRecommendations } = require("../controllers/recommendation.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/:studentId", requireAuth, getRecommendations);

module.exports = router;