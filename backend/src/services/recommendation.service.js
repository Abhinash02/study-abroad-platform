// const mongoose = require("mongoose");
// const Program = require("../models/Program");
// const Student = require("../models/Student");
// const HttpError = require("../utils/httpError");

// async function buildProgramRecommendations(studentId) {
//   const student = await Student.findById(studentId).lean();
//   if (!student) {
//     throw new HttpError(404, "Student not found.");
//   }

//   const targetCountries = student.targetCountries || [];
//   const interestedFields = student.interestedFields || [];
//   const preferredIntake = student.preferredIntake || "";
//   const maxBudgetUsd = student.maxBudgetUsd || 0;
//   const ieltsScore = student.englishTest?.score || 0;

//   const recommendations = await Program.aggregate([
//     {
//       $match: {
//         ...(targetCountries.length ? { country: { $in: targetCountries } } : {}),
//       },
//     },
//     {
//       $addFields: {
//         countryMatch: {
//           $cond: [{ $in: ["$country", targetCountries] }, 35, 0],
//         },
//         fieldMatch: {
//           $cond: [
//             {
//               $gt: [
//                 {
//                   $size: {
//                     $filter: {
//                       input: interestedFields,
//                       as: "fieldName",
//                       cond: {
//                         $regexMatch: {
//                           input: "$field",
//                           regex: "$$fieldName",
//                           options: "i",
//                         },
//                       },
//                     },
//                   },
//                 },
//                 0,
//               ],
//             },
//             30,
//             0,
//           ],
//         },
//         budgetMatch: {
//           $cond: [{ $lte: ["$tuitionFeeUsd", maxBudgetUsd] }, 20, 0],
//         },
//         intakeMatch: {
//           $cond: [{ $in: [preferredIntake, "$intakes"] }, 10, 0],
//         },
//         ieltsMatch: {
//           $cond: [{ $lte: ["$minimumIelts", ieltsScore] }, 5, 0],
//         },
//       },
//     },
//     {
//       $addFields: {
//         matchScore: {
//           $add: [
//             "$countryMatch",
//             "$fieldMatch",
//             "$budgetMatch",
//             "$intakeMatch",
//             "$ieltsMatch",
//           ],
//         },
//       },
//     },
//     {
//       $match: {
//         matchScore: { $gt: 0 },
//       },
//     },
//     {
//       $sort: {
//         matchScore: -1,
//         scholarshipAvailable: -1,
//         tuitionFeeUsd: 1,
//       },
//     },
//     {
//       $limit: 6,
//     },
//     {
//       $project: {
//         title: 1,
//         field: 1,
//         country: 1,
//         city: 1,
//         degreeLevel: 1,
//         tuitionFeeUsd: 1,
//         intakes: 1,
//         minimumIelts: 1,
//         universityName: 1,
//         scholarshipAvailable: 1,
//         matchScore: 1,
//         reasons: {
//           $setUnion: [
//             {
//               $cond: [{ $gt: ["$countryMatch", 0] }, [`Preferred country match: ${student.targetCountries?.join(", ")}`], []],
//             },
//             {
//               $cond: [{ $gt: ["$fieldMatch", 0] }, [`Field alignment with ${student.interestedFields?.join(", ")}`], []],
//             },
//             {
//               $cond: [{ $gt: ["$budgetMatch", 0] }, ["Within budget range"], []],
//             },
//             {
//               $cond: [{ $gt: ["$intakeMatch", 0] }, [`Preferred intake available: ${preferredIntake}`], []],
//             },
//             {
//               $cond: [{ $gt: ["$ieltsMatch", 0] }, ["IELTS score meets requirement"], []],
//             },
//           ],
//         },
//       },
//     },
//   ]);

//   return {
//     student: {
//       id: student._id,
//       fullName: student.fullName,
//       targetCountries: student.targetCountries,
//       interestedFields: student.interestedFields,
//       preferredIntake: student.preferredIntake,
//       maxBudgetUsd: student.maxBudgetUsd,
//       englishTest: student.englishTest,
//     },
//     recommendations,
//   };
// }

// module.exports = {
//   buildProgramRecommendations,
// };

// const Program = require("../models/Program");
// const Student = require("../models/Student");
// const HttpError = require("../utils/httpError");

// async function buildProgramRecommendations(studentId) {
//   const student = await Student.findById(studentId).lean();

//   if (!student) {
//     throw new HttpError(404, "Student not found.");
//   }

//   const targetCountries = student.targetCountries || [];
//   const interestedFields = student.interestedFields || [];
//   const preferredIntake = student.preferredIntake || "";
//   const maxBudgetUsd = student.maxBudgetUsd || 0;
//   const ieltsScore = student.englishTest?.score || 0;

//   const recommendations = await Program.aggregate([
//     {
//       $match: targetCountries.length
//         ? { country: { $in: targetCountries } }
//         : {},
//     },
//     {
//       $addFields: {
//         countryMatch: { $cond: [{ $in: ["$country", targetCountries] }, 35, 0] },
//         fieldMatch: {
//           $cond: [
//             {
//               $gt: [
//                 {
//                   $size: {
//                     $filter: {
//                       input: interestedFields,
//                       as: "f",
//                       cond: {
//                         $regexMatch: {
//                           input: "$field",
//                           regex: "$$f",
//                           options: "i",
//                         },
//                       },
//                     },
//                   },
//                 },
//                 0,
//               ],
//             },
//             30,
//             0,
//           ],
//         },
//         budgetMatch: { $cond: [{ $lte: ["$tuitionFeeUsd", maxBudgetUsd] }, 20, 0] },
//         intakeMatch: { $cond: [{ $in: [preferredIntake, "$intakes"] }, 10, 0] },
//         ieltsMatch: { $cond: [{ $lte: ["$minimumIelts", ieltsScore] }, 5, 0] },
//       },
//     },
//     {
//       $addFields: {
//         matchScore: {
//           $add: [
//             "$countryMatch",
//             "$fieldMatch",
//             "$budgetMatch",
//             "$intakeMatch",
//             "$ieltsMatch",
//           ],
//         },
//       },
//     },
//     {
//       $match: {
//         matchScore: { $gt: 0 },
//       },
//     },
//     {
//       $sort: {
//         matchScore: -1,
//         scholarshipAvailable: -1,
//         tuitionFeeUsd: 1,
//       },
//     },
//     { $limit: 6 },
//     {
//       $project: {
//         title: 1,
//         field: 1,
//         country: 1,
//         city: 1,
//         degreeLevel: 1,
//         tuitionFeeUsd: 1,
//         intakes: 1,
//         minimumIelts: 1,
//         universityName: 1,
//         scholarshipAvailable: 1,
//         matchScore: 1,
//         reasons: {
//           $setUnion: [
//             {
//               $cond: [{ $gt: ["$countryMatch", 0] }, ["Preferred country match"], []],
//             },
//             {
//               $cond: [{ $gt: ["$fieldMatch", 0] }, ["Field alignment"], []],
//             },
//             {
//               $cond: [{ $gt: ["$budgetMatch", 0] }, ["Within budget range"], []],
//             },
//             {
//               $cond: [{ $gt: ["$intakeMatch", 0] }, ["Preferred intake available"], []],
//             },
//             {
//               $cond: [{ $gt: ["$ieltsMatch", 0] }, ["IELTS score meets requirement"], []],
//             },
//           ],
//         },
//       },
//     },
//   ]);

//   return {
//     student: {
//       id: student._id,
//       fullName: student.fullName,
//       targetCountries: student.targetCountries,
//       interestedFields: student.interestedFields,
//       preferredIntake: student.preferredIntake,
//       maxBudgetUsd: student.maxBudgetUsd,
//       englishTest: student.englishTest,
//     },
//     recommendations,
//   };
// }

// module.exports = {
//   buildProgramRecommendations,
// };


const Program = require("../models/Program");
const Student = require("../models/Student");
const HttpError = require("../utils/httpError");

async function buildProgramRecommendations(studentId) {
  const student = await Student.findById(studentId).lean();

  if (!student) {
    throw new HttpError(404, "Student not found.");
  }

  const targetCountries = (student.targetCountries || []).map((item) =>
    item.toLowerCase().trim()
  );

  const interestedFields = (student.interestedFields || []).map((item) =>
    item.toLowerCase().trim()
  );

  const preferredIntake = (student.preferredIntake || "").toLowerCase().trim();
  const maxBudgetUsd = Number(student.maxBudgetUsd || 0);
  const ieltsScore = Number(student.englishTest?.score || 0);

  const recommendations = await Program.aggregate([
    {
      $addFields: {
        normalizedCountry: { $toLower: "$country" },
        normalizedField: { $toLower: "$field" },
        normalizedIntakes: {
          $map: {
            input: "$intakes",
            as: "intake",
            in: { $toLower: "$$intake" },
          },
        },
      },
    },
    {
      $addFields: {
        countryMatch: {
          $cond: [{ $in: ["$normalizedCountry", targetCountries] }, 35, 0],
        },
        fieldMatch: {
          $cond: [{ $in: ["$normalizedField", interestedFields] }, 30, 0],
        },
        budgetMatch: {
          $cond: [
            {
              $and: [
                { $gt: [maxBudgetUsd, 0] },
                { $lte: ["$tuitionFeeUsd", maxBudgetUsd] },
              ],
            },
            20,
            0,
          ],
        },
        intakeMatch: {
          $cond: [
            {
              $and: [
                { $ne: [preferredIntake, ""] },
                { $in: [preferredIntake, "$normalizedIntakes"] },
              ],
            },
            10,
            0,
          ],
        },
        ieltsMatch: {
          $cond: [{ $lte: ["$minimumIelts", ieltsScore] }, 5, 0],
        },
      },
    },
    {
      $addFields: {
        matchScore: {
          $add: [
            "$countryMatch",
            "$fieldMatch",
            "$budgetMatch",
            "$intakeMatch",
            "$ieltsMatch",
          ],
        },
      },
    },
    {
      $match: {
        matchScore: { $gt: 0 },
      },
    },
    {
      $sort: {
        matchScore: -1,
        scholarshipAvailable: -1,
        tuitionFeeUsd: 1,
      },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        title: 1,
        field: 1,
        country: 1,
        city: 1,
        degreeLevel: 1,
        tuitionFeeUsd: 1,
        intakes: 1,
        minimumIelts: 1,
        universityName: 1,
        scholarshipAvailable: 1,
        matchScore: 1,
        reasons: {
          $concatArrays: [
            {
              $cond: [
                { $gt: ["$countryMatch", 0] },
                ["Matches your preferred country"],
                [],
              ],
            },
            {
              $cond: [
                { $gt: ["$fieldMatch", 0] },
                ["Matches your interested field"],
                [],
              ],
            },
            {
              $cond: [
                { $gt: ["$budgetMatch", 0] },
                ["Fits within your budget"],
                [],
              ],
            },
            {
              $cond: [
                { $gt: ["$intakeMatch", 0] },
                ["Available in your preferred intake"],
                [],
              ],
            },
            {
              $cond: [
                { $gt: ["$ieltsMatch", 0] },
                ["Your English score meets the requirement"],
                [],
              ],
            },
          ],
        },
      },
    },
  ]);

  return {
    student: {
      id: student._id,
      fullName: student.fullName,
      targetCountries: student.targetCountries,
      interestedFields: student.interestedFields,
      preferredIntake: student.preferredIntake,
      maxBudgetUsd: student.maxBudgetUsd,
      englishTest: student.englishTest,
    },
    recommendations,
  };
}

module.exports = {
  buildProgramRecommendations,
};