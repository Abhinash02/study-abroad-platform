// const express = require("express");
// const { getOverview } = require("../controllers/dashboardController");
// const { requireAuth } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.get("/overview", requireAuth, getOverview);

// module.exports = router;

const express = require("express");
const { getOverview } = require("../controllers/dashboard.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/overview", requireAuth, getOverview);

module.exports = router;