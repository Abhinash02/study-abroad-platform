const express = require("express");
const { compareProgramsController } = require("../controllers/compare.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", requireAuth, compareProgramsController);

module.exports = router;