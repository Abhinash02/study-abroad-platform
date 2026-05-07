const asyncHandler = require("../utils/asyncHandler");
const Application = require("../models/Application");
const Program = require("../models/Program");

const createApplication = asyncHandler(async (req, res) => {
  const application = await Application.create(req.body);

  return res.status(201).json({
    success: true,
    message: "Application created successfully",
    data: application,
  });
});

const applyProgram = asyncHandler(async (req, res) => {
  const { studentId, programId, intake, note } = req.body;

  const program = await Program.findById(programId);

  if (!program) {
    return res.status(404).json({
      success: false,
      message: "Program not found",
    });
  }

  const existingApplication = await Application.findOne({
    student: studentId,
    program: programId,
    intake,
  });

  if (existingApplication) {
    return res.status(409).json({
      success: false,
      message: "You have already applied to this program for this intake.",
    });
  }

  const application = await Application.create({
    student: studentId,
    program: programId,
    intake,
    note: note || "Application started from dashboard.",
    status: "submitted",
    source: "student-panel",
    forwardedTo: "counselor-panel",
    timeline: [
      {
        status: "draft",
        message: "Application created by student.",
      },
      {
        status: "submitted",
        message: "Application submitted.",
      },
    ],
  });

  const populatedApplication = await Application.findById(application._id).populate("student program");

  return res.status(201).json({
    success: true,
    message: "Program application submitted successfully",
    data: populatedApplication,
  });
});

const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find()
    .populate("student program")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    data: applications,
  });
});

const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id).populate("student program");

  if (!application) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: application,
  });
});

const updateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("student program");

  if (!application) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Application updated successfully",
    data: application,
  });
});

const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findByIdAndDelete(req.params.id);

  if (!application) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Application deleted successfully",
  });
});

module.exports = {
  createApplication,
  applyProgram,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};