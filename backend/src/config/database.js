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

let isConnected = false;

async function connectDatabase() {
  if (isConnected) return;

  mongoose.set("strictQuery", true);

  await mongoose.connect(env.mongoUri, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000,
  });

  isConnected = true;
  console.log("Connected to MongoDB");
}

module.exports = connectDatabase;