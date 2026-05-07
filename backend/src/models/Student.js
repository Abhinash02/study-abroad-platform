const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["student", "counselor"],
      default: "student",
      index: true,
    },
    targetCountries: {
      type: [String],
      default: [],
    },
    interestedFields: {
      type: [String],
      default: [],
    },
    preferredIntake: {
      type: String,
      default: "",
    },
    maxBudgetUsd: {
      type: Number,
      default: 0,
    },
    englishTest: {
      exam: {
        type: String,
        default: "IELTS",
      },
      score: {
        type: Number,
        default: 0,
      },
    },
    profileComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// studentSchema.pre("save", async function savePassword(next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });
studentSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

studentSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Student", studentSchema);
