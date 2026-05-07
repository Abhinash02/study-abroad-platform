// const mongoose = require("mongoose");
// const env = require("./env");

// async function connectDatabase() {
//   mongoose.set("strictQuery", true);
//   await mongoose.connect(env.mongoUri);
//   console.log("Connected to MongoDB");
// }

// module.exports = connectDatabase;

const mongoose = require("mongoose");
const env = require("./env");

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(env.mongoUri, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000,
  });

  console.log("Connected to MongoDB");
}

module.exports = connectDatabase;