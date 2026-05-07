const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true, index: true },
    city: { type: String, required: true },
    partnerType: {
      type: String,
      enum: ["direct", "recruitment-partner", "institution-partner"],
      default: "direct",
      index: true,
    },
    qsRanking: { type: Number, default: 0 },
    scholarshipAvailable: { type: Boolean, default: false, index: true },
    popularScore: { type: Number, default: 0, index: true },
    tags: { type: [String], default: [] },
    websiteUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

universitySchema.index({ name: "text", country: "text", city: "text", tags: "text" });
universitySchema.index({ country: 1, popularScore: -1, qsRanking: 1 });

module.exports = mongoose.model("University", universitySchema);
