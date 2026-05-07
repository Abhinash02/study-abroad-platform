
const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      trim: true,
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

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },
    intake: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "submitted", "under-review", "approved", "rejected"],
      default: "submitted",
    },
    source: {
      type: String,
      default: "student-panel",
    },
    forwardedTo: {
      type: String,
      default: "counselor-panel",
    },
    timeline: {
      type: [timelineSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);