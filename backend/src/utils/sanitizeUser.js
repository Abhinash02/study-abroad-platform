function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    _id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    targetCountries: user.targetCountries || [],
    interestedFields: user.interestedFields || [],
    preferredIntake: user.preferredIntake || "",
    maxBudgetUsd: user.maxBudgetUsd || 0,
    englishTest: user.englishTest || { exam: "IELTS", score: 0 },
    profileComplete: user.profileComplete || false,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

module.exports = sanitizeUser;