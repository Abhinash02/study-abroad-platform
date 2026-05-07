// const express = require("express");
// const { getRecommendations } = require("../controllers/recommendationController");
// const { requireAuth } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.get("/:studentId", requireAuth, getRecommendations);

// module.exports = router;

const express = require("express");
const { getRecommendations } = require("../controllers/recommendation.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/:studentId", requireAuth, getRecommendations);

module.exports = router;