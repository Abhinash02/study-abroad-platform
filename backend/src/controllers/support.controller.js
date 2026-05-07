const SupportRequest = require("../models/SupportRequest");
const asyncHandler = require("../utils/asyncHandler");
const HttpError = require("../utils/httpError");
const { successResponse } = require("../utils/apiResponse");
const { parsePagination } = require("../utils/query");

const createSupportRequest = asyncHandler(async (req, res) => {
  if (req.user.role !== "student") {
    throw new HttpError(403, "Only students can create support requests.");
  }

  const { subject, description, category, message } = req.body;

  const ticket = await SupportRequest.create({
    student: req.user._id,
    subject,
    description,
    category: category || "general",
    status: "open",
    lastUpdatedBy: req.user._id,
    messages: [
      {
        sender: req.user._id,
        senderRole: "student",
        message: message || description,
      },
    ],
  });

  const populated = await SupportRequest.findById(ticket._id)
    .populate("student", "fullName email role")
    .populate("messages.sender", "fullName email role");

  return successResponse(res, populated, "Support request created successfully.");
});

const getSupportRequests = asyncHandler(async (req, res) => {
  const { status, search } = req.query;
  const { page, limit, skip } = parsePagination(req.query);
  const filters = {};

  if (status) {
    filters.status = status;
  }

  if (req.user.role === "student") {
    filters.student = req.user._id;
  }

  if (search) {
    filters.$or = [
      { subject: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  const [requests, total] = await Promise.all([
    SupportRequest.find(filters)
      .populate("student", "fullName email role")
      .populate("messages.sender", "fullName email role")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    SupportRequest.countDocuments(filters),
  ]);

  return successResponse(res, requests, "Support requests fetched successfully.", {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPrevPage: page > 1,
  });
});

const updateSupportRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { subject, description, category } = req.body;

  const supportRequest = await SupportRequest.findById(id);
  if (!supportRequest) {
    throw new HttpError(404, "Support request not found.");
  }

  if (req.user.role !== "student") {
    throw new HttpError(403, "Only students can update support requests.");
  }

  if (supportRequest.student.toString() !== req.user._id.toString()) {
    throw new HttpError(403, "You can update only your own support request.");
  }

  if (supportRequest.status === "resolved") {
    throw new HttpError(400, "Resolved support requests cannot be updated by student.");
  }

  if (typeof subject === "string" && subject.trim()) {
    supportRequest.subject = subject.trim();
  }

  if (typeof description === "string" && description.trim()) {
    supportRequest.description = description.trim();
  }

  if (
    typeof category === "string" &&
    ["admission", "visa", "documents", "finance", "general"].includes(category)
  ) {
    supportRequest.category = category;
  }

  supportRequest.lastUpdatedBy = req.user._id;
  supportRequest.messages.push({
    sender: req.user._id,
    senderRole: "student",
    message: "Support request details updated by student.",
  });

  await supportRequest.save();

  const populated = await SupportRequest.findById(id)
    .populate("student", "fullName email role")
    .populate("messages.sender", "fullName email role");

  return successResponse(res, populated, "Support request updated successfully.");
});

const deleteSupportRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const supportRequest = await SupportRequest.findById(id);
  if (!supportRequest) {
    throw new HttpError(404, "Support request not found.");
  }

  if (req.user.role !== "student") {
    throw new HttpError(403, "Only students can delete support requests.");
  }

  if (supportRequest.student.toString() !== req.user._id.toString()) {
    throw new HttpError(403, "You can delete only your own support request.");
  }

  if (supportRequest.status !== "open") {
    throw new HttpError(400, "Only open support requests can be deleted by student.");
  }

  await SupportRequest.findByIdAndDelete(id);

  return successResponse(res, { id }, "Support request deleted successfully.");
});

const addSupportMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  const supportRequest = await SupportRequest.findById(id);
  if (!supportRequest) {
    throw new HttpError(404, "Support request not found.");
  }

  if (
    req.user.role === "student" &&
    supportRequest.student.toString() !== req.user._id.toString()
  ) {
    throw new HttpError(403, "You can only reply to your own support requests.");
  }

  supportRequest.messages.push({
    sender: req.user._id,
    senderRole: req.user.role,
    message,
  });

  supportRequest.lastUpdatedBy = req.user._id;

  if (req.user.role === "counselor" && supportRequest.status === "open") {
    supportRequest.status = "in-progress";
  }

  await supportRequest.save();

  const populated = await SupportRequest.findById(id)
    .populate("student", "fullName email role")
    .populate("messages.sender", "fullName email role");

  return successResponse(res, populated, "Support message added successfully.");
});

const updateSupportFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { counselorFeedback, status } = req.body;

  if (req.user.role !== "counselor") {
    throw new HttpError(403, "Only counselors can update support feedback.");
  }

  const supportRequest = await SupportRequest.findById(id);
  if (!supportRequest) {
    throw new HttpError(404, "Support request not found.");
  }

  if (typeof counselorFeedback === "string") {
    supportRequest.counselorFeedback = counselorFeedback;
  }

  if (status && ["open", "in-progress", "resolved"].includes(status)) {
    supportRequest.status = status;
  }

  supportRequest.lastUpdatedBy = req.user._id;

  if (counselorFeedback) {
    supportRequest.messages.push({
      sender: req.user._id,
      senderRole: "counselor",
      message: counselorFeedback,
    });
  }

  await supportRequest.save();

  const populated = await SupportRequest.findById(id)
    .populate("student", "fullName email role")
    .populate("messages.sender", "fullName email role");

  return successResponse(res, populated, "Counselor feedback updated successfully.");
});

module.exports = {
  createSupportRequest,
  getSupportRequests,
  updateSupportRequest,
  deleteSupportRequest,
  addSupportMessage,
  updateSupportFeedback,
};