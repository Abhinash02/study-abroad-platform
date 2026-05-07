const mongoose = require("mongoose");

const supportMessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    senderRole: {
      type: String,
      enum: ["student", "counselor"],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const supportRequestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    counselorFeedback: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      enum: ["admission", "visa", "documents", "finance", "general"],
      default: "general",
      index: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open",
      index: true,
    },
    messages: {
      type: [supportMessageSchema],
      default: [],
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
  },
  { timestamps: true }
);

supportRequestSchema.index({ student: 1, status: 1, updatedAt: -1 });
supportRequestSchema.index({ subject: "text", description: "text", category: "text" });

module.exports = mongoose.model("SupportRequest", supportRequestSchema);