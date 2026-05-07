const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const Student = require("../models/Student");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Student.deleteMany({});
});

describe("Auth flow", () => {
  test("should register a new student and return token", async () => {
    const response = await request(app).post("/api/auth/register").send({
      fullName: "Test User",
      email: "test@example.com",
      password: "Candidate123!",
      role: "student",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.data.user.email).toBe("test@example.com");
  });
});