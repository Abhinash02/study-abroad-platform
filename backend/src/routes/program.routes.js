const express = require("express");
const { listPrograms } = require("../controllers/program.controller");

const router = express.Router();

router.get("/", listPrograms);

module.exports = router;