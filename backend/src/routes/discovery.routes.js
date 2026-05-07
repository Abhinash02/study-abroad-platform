const express = require("express");
const router = express.Router();

const discoveryController = require("../controllers/discovery.controller");
const {
  discoveryValidation,
} = require("../validations/discovery.validation");

router.get("/", discoveryValidation, discoveryController.getDiscoveryData);

module.exports = router;