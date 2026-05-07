const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const {
  registerValidation,
  loginValidation,
} = require("../validations/auth.validation");

router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);
router.get("/me", requireAuth, authController.me);
router.patch("/me", requireAuth, authController.updateProfile);

module.exports = router;