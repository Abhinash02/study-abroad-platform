const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");

const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("role")
    .optional()
    .isIn(["student", "teacher", "admin"])
    .withMessage("Invalid role"),

  validate,
];

const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  validate,
];

module.exports = {
  registerValidation,
  loginValidation,
};