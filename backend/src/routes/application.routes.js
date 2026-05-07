
const express = require("express");        
const router = express.Router();

const applicationController = require("../controllers/application.controller");
const { createApplicationValidation, applyProgramValidation, updateApplicationValidation, applicationIdValidation } = require("../validations/application.validation");

// Manual full application form
router.post("/", createApplicationValidation, applicationController.createApplication);

// Student panel → counselor panel apply
router.post("/apply", applyProgramValidation, applicationController.applyProgram);

// List and single item
router.get("/", applicationController.getApplications);
router.get("/:id", applicationIdValidation, applicationController.getApplicationById);

// Update / delete
router.put("/:id", updateApplicationValidation, applicationController.updateApplication);
router.delete("/:id", applicationIdValidation, applicationController.deleteApplication);

module.exports = router;