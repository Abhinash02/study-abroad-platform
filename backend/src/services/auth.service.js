const Student = require("../models/Student");
const HttpError = require("../utils/httpError");

async function registerUser(payload) {
  const existingUser = await Student.findOne({ email: payload.email.toLowerCase() });
  if (existingUser) {
    throw new HttpError(409, "Email is already registered.");
  }

  const user = await Student.create({
    ...payload,
    email: payload.email.toLowerCase(),
  });

  return user;
}

async function loginUser(email, password) {
  const user = await Student.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new HttpError(401, "Invalid email or password.");
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    throw new HttpError(401, "Invalid email or password.");
  }

  return user;
}

module.exports = {
  registerUser,
  loginUser,
};
