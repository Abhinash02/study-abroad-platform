

// // const { body, param } = require("express-validator");
// // const validate = require("../middleware/validate.middleware");

// // const createApplicationValidation = [
// //   body("studentName").trim().notEmpty().withMessage("Student name is required"),
// //   body("email").trim().isEmail().withMessage("Valid email is required"),
// //   body("phone").trim().notEmpty().withMessage("Phone is required"),
// //   body("country").trim().notEmpty().withMessage("Country is required"),
// //   body("course").trim().notEmpty().withMessage("Course is required"),
// //   validate,
// // ];

// // const updateApplicationValidation = [
// //   param("id").isMongoId().withMessage("Invalid application id"),
// //   body("studentName").optional().trim().notEmpty().withMessage("Student name cannot be empty"),
// //   body("email").optional().trim().isEmail().withMessage("Valid email is required"),
// //   body("phone").optional().trim().notEmpty().withMessage("Phone cannot be empty"),
// //   body("country").optional().trim().notEmpty().withMessage("Country cannot be empty"),
// //   body("course").optional().trim().notEmpty().withMessage("Course cannot be empty"),
// //   validate,
// // ];

// // const applicationIdValidation = [
// //   param("id").isMongoId().withMessage("Invalid application id"),
// //   validate,
// // ];

// // module.exports = {
// //   createApplicationValidation,
// //   updateApplicationValidation,
// //   applicationIdValidation,
// // };

// const { body, param } = require("express-validator");
// const validate = require("../middleware/validate.middleware");

// const createApplicationValidation = [
//   body("studentName")
//     .trim()
//     .notEmpty()
//     .withMessage("Student name is required"),

//   body("email")
//     .trim()
//     .isEmail()
//     .withMessage("Valid email is required"),

//   body("phone")
//     .trim()
//     .notEmpty()
//     .withMessage("Phone is required"),

//   body("country")
//     .trim()
//     .notEmpty()
//     .withMessage("Country is required"),

//   body("course")
//     .trim()
//     .notEmpty()
//     .withMessage("Course is required"),

//   body("intake")
//     .optional()
//     .trim()
//     .notEmpty()
//     .withMessage("Intake cannot be empty"),

//   validate,
// ];

// const applyProgramValidation = [
//   body("studentId")
//     .isMongoId()
//     .withMessage("Invalid student id"),

//   body("programId")
//     .isMongoId()
//     .withMessage("Invalid program id"),

//   body("intake")
//     .trim()
//     .notEmpty()
//     .withMessage("Intake is required"),

//   body("note")
//     .optional()
//     .trim(),

//   validate,
// ];

// const updateApplicationValidation = [
//   param("id")
//     .isMongoId()
//     .withMessage("Invalid application id"),

//   body("studentName")
//     .optional()
//     .trim()
//     .notEmpty()
//     .withMessage("Student name cannot be empty"),

//   body("email")
//     .optional()
//     .trim()
//     .isEmail()
//     .withMessage("Valid email is required"),

//   body("phone")
//     .optional()
//     .trim()
//     .notEmpty()
//     .withMessage("Phone cannot be empty"),

//   body("country")
//     .optional()
//     .trim()
//     .notEmpty()
//     .withMessage("Country cannot be empty"),

//   body("course")
//     .optional()
//     .trim()
//     .notEmpty()
//     .withMessage("Course cannot be empty"),

//   validate,
// ];

// const applicationIdValidation = [
//   param("id")
//     .isMongoId()
//     .withMessage("Invalid application id"),

//   validate,
// ];

// module.exports = {
//   createApplicationValidation,
//   applyProgramValidation,
//   updateApplicationValidation,
//   applicationIdValidation,
// };

// const { body, param } = require("express-validator");
// const validate = require("../middleware/validate.middleware");

// const createApplicationValidation = [
//   body("studentName").trim().notEmpty().withMessage("Student name is required"),
//   body("email").trim().isEmail().withMessage("Valid email is required"),
//   body("phone").trim().notEmpty().withMessage("Phone is required"),
//   body("country").trim().notEmpty().withMessage("Country is required"),
//   body("course").trim().notEmpty().withMessage("Course is required"),
//   validate,
// ];

// const applyProgramValidation = [
//   body("studentId").isMongoId().withMessage("Invalid student id"),
//   body("programId").isMongoId().withMessage("Invalid program id"),
//   body("intake").trim().notEmpty().withMessage("Intake is required"),
//   body("note").optional().trim(),
//   validate,
// ];

// const updateApplicationValidation = [
//   param("id").isMongoId().withMessage("Invalid application id"),
//   validate,
// ];

// const applicationIdValidation = [
//   param("id").isMongoId().withMessage("Invalid application id"),
//   validate,
// ];

// module.exports = {
//   createApplicationValidation,
//   applyProgramValidation,
//   updateApplicationValidation,
//   applicationIdValidation,
// };


const { body, param } = require("express-validator");
const validate = require("../middleware/validate.middleware");

const createApplicationValidation = [
  body("studentName").trim().notEmpty().withMessage("Student name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("country").trim().notEmpty().withMessage("Country is required"),
  body("course").trim().notEmpty().withMessage("Course is required"),
  validate,
];

const applyProgramValidation = [
  body("studentId").isMongoId().withMessage("Invalid student id"),
  body("programId").isMongoId().withMessage("Invalid program id"),
  body("intake").trim().notEmpty().withMessage("Intake is required"),
  body("note").optional().trim(),
  validate,
];

const updateApplicationValidation = [
  param("id").isMongoId().withMessage("Invalid application id"),
  validate,
];

const applicationIdValidation = [
  param("id").isMongoId().withMessage("Invalid application id"),
  validate,
];

module.exports = {
  createApplicationValidation,
  applyProgramValidation,
  updateApplicationValidation,
  applicationIdValidation,
};