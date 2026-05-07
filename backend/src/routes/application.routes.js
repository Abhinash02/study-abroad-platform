// const express = require("express");
// const {
//   listApplications,
//   createApplication,
//   updateApplicationStatus,
// } = require("../controllers/applicationController");
// const { requireAuth } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.get("/", requireAuth, listApplications);
// router.post("/", requireAuth, createApplication);
// router.patch("/:id/status", requireAuth, updateApplicationStatus);

// module.exports = router;


const express = require("express");
const {
  createApplication,
  listApplications,
  updateApplicationStatus,
} = require("../controllers/application.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", requireAuth, listApplications);
router.post("/", requireAuth, createApplication);
router.patch("/:id/status", requireAuth, updateApplicationStatus);

module.exports = router;