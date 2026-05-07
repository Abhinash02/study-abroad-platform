const express = require("express");
const {
  createSupportRequest,
  getSupportRequests,
  updateSupportRequest,
  deleteSupportRequest,
  addSupportMessage,
  updateSupportFeedback,
} = require("../controllers/support.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", requireAuth, getSupportRequests);
router.post("/", requireAuth, createSupportRequest);
router.patch("/:id", requireAuth, updateSupportRequest);
router.delete("/:id", requireAuth, deleteSupportRequest);
router.post("/:id/messages", requireAuth, addSupportMessage);
router.patch("/:id/feedback", requireAuth, updateSupportFeedback);

module.exports = router;