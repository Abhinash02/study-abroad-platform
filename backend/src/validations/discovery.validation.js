const { query } = require("express-validator");
const validate = require("../middleware/validate.middleware");

const discoveryValidation = [
  query("country")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Country cannot be empty"),

  query("course")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Course cannot be empty"),

  query("level")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Level cannot be empty"),

  query("budget")
    .optional()
    .isNumeric()
    .withMessage("Budget must be a number"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  validate,
];

module.exports = {
  discoveryValidation,
};