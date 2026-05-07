const Program = require("../models/Program");
const Student = require("../models/Student");
const HttpError = require("../utils/httpError");

function calculateProgramScore(program, student) {
  const weights = {
    budget: 30,
    ielts: 20,
    country: 20,
    field: 15,
    scholarship: 10,
    intake: 5,
  };

  let score = 0;
  const reasons = [];

  if (student.maxBudgetUsd && program.tuitionFeeUsd <= student.maxBudgetUsd) {
    score += weights.budget;
    reasons.push("Within budget");
  }

  if (
    typeof student.englishTest?.score === "number" &&
    student.englishTest.score >= program.minimumIelts
  ) {
    score += weights.ielts;
    reasons.push("IELTS requirement satisfied");
  }

  if ((student.targetCountries || []).includes(program.country)) {
    score += weights.country;
    reasons.push("Preferred country match");
  }

  const matchedField = (student.interestedFields || []).some((field) =>
    program.field.toLowerCase().includes(field.toLowerCase())
  );
  if (matchedField) {
    score += weights.field;
    reasons.push("Interested field match");
  }

  if (program.scholarshipAvailable) {
    score += weights.scholarship;
    reasons.push("Scholarship available");
  }

  if ((program.intakes || []).includes(student.preferredIntake)) {
    score += weights.intake;
    reasons.push("Preferred intake available");
  }

  return {
    percentage: score,
    reasons,
  };
}

async function comparePrograms(programIds, studentId) {
  if (!Array.isArray(programIds) || programIds.length < 2) {
    throw new HttpError(400, "At least two program IDs are required for comparison.");
  }

  const [student, programs] = await Promise.all([
    Student.findById(studentId).lean(),
    Program.find({ _id: { $in: programIds } }).lean(),
  ]);

  if (!student) {
    throw new HttpError(404, "Student not found.");
  }

  if (programs.length < 2) {
    throw new HttpError(404, "Could not find enough programs for comparison.");
  }

  const compared = programs.map((program) => {
    const score = calculateProgramScore(program, student);
    return {
      _id: program._id,
      title: program.title,
      universityName: program.universityName,
      country: program.country,
      field: program.field,
      degreeLevel: program.degreeLevel,
      tuitionFeeUsd: program.tuitionFeeUsd,
      minimumIelts: program.minimumIelts,
      scholarshipAvailable: program.scholarshipAvailable,
      intakes: program.intakes,
      comparisonPercentage: score.percentage,
      reasons: score.reasons,
    };
  });

  compared.sort((a, b) => b.comparisonPercentage - a.comparisonPercentage);

  return {
    studentProfile: {
      id: student._id,
      fullName: student.fullName,
      targetCountries: student.targetCountries,
      interestedFields: student.interestedFields,
      preferredIntake: student.preferredIntake,
      maxBudgetUsd: student.maxBudgetUsd,
      englishTest: student.englishTest,
    },
    programs: compared,
    bestProgram: compared[0],
  };
}

module.exports = {
  comparePrograms,
};