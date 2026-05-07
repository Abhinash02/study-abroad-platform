const Application = require("../models/Application");
const Program = require("../models/Program");
const asyncHandler = require("../utils/asyncHandler");
const HttpError = require("../utils/httpError");
const { successResponse } = require("../utils/apiResponse");
const { validStatusTransitions } = require("../config/constants");

const listApplications = asyncHandler(async (req, res) => {
  const { studentId, status } = req.query;
  const filters = {};

  if (studentId) filters.student = studentId;
  if (status) filters.status = status;

  const applications = await Application.find(filters)
    .populate("student", "fullName email role")
    .populate("program", "title degreeLevel tuitionFeeUsd intakes")
    .populate("university", "name country city")
    .sort({ createdAt: -1 })
    .lean();

  return successResponse(res, applications, "Applications fetched successfully.");
});

const createApplication = asyncHandler(async (req, res) => {
  const { studentId, programId, intake, note } = req.body;

  const program = await Program.findById(programId).lean();
  if (!program) {
    throw new HttpError(404, "Program not found.");
  }

  if (!program.intakes.includes(intake)) {
    throw new HttpError(400, "Selected intake is not available for this program.");
  }

  const existingApplication = await Application.findOne({
    student: studentId,
    program: programId,
    intake,
  });

  if (existingApplication) {
    throw new HttpError(
      409,
      "Duplicate application is not allowed for the same program and intake."
    );
  }

  const application = await Application.create({
    student: studentId,
    program: programId,
    university: program.university,
    destinationCountry: program.country,
    intake,
    status: "draft",
    timeline: [
      {
        status: "draft",
        note: note || "Application created by student.",
        changedBy: req.user?._id,
      },
    ],
  });

  const populated = await Application.findById(application._id)
    .populate("student", "fullName email role")
    .populate("program", "title degreeLevel tuitionFeeUsd")
    .populate("university", "name country city");

  return successResponse(res, populated, "Application created successfully.");
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;

  const application = await Application.findById(id);
  if (!application) {
    throw new HttpError(404, "Application not found.");
  }

  const allowed = validStatusTransitions[application.status] || [];
  if (!allowed.includes(status)) {
    throw new HttpError(
      400,
      `Invalid status transition from ${application.status} to ${status}.`
    );
  }

  application.status = status;
  application.timeline.push({
    status,
    note: note || `Status updated to ${status}.`,
    changedBy: req.user?._id,
  });

  await application.save();

  const populated = await Application.findById(application._id)
    .populate("student", "fullName email role")
    .populate("program", "title degreeLevel tuitionFeeUsd")
    .populate("university", "name country city");

  return successResponse(res, populated, "Application status updated successfully.");
});

module.exports = {
  listApplications,
  createApplication,
  updateApplicationStatus,
};
