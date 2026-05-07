const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const Student = require("../models/Student");
const University = require("../models/University");
const Program = require("../models/Program");
const Application = require("../models/Application");
const { signToken } = require("../utils/jwt");

let mongoServer;
let student;
let token;
let university;
let program;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
  student = await Student.create({
    fullName: "Aarav Malhotra",
    email: "aarav@example.com",
    password: "Candidate123!",
    role: "student",
  });

  token = signToken(student);

  university = await University.create({
    name: "University of Windsor",
    country: "Canada",
    city: "Windsor",
    partnerType: "direct",
    scholarshipAvailable: true,
    popularScore: 88,
  });

  program = await Program.create({
    university: university._id,
    universityName: university.name,
    country: "Canada",
    city: "Windsor",
    title: "Master of Applied Computing",
    field: "Computer Science",
    degreeLevel: "master",
    tuitionFeeUsd: 22800,
    intakes: ["September", "May"],
    minimumIelts: 6.5,
    scholarshipAvailable: false,
  });
});

afterEach(async () => {
  await Application.deleteMany({});
  await Program.deleteMany({});
  await University.deleteMany({});
  await Student.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Application flow", () => {
  test("should create application successfully", async () => {
    const response = await request(app)
      .post("/api/applications")
      .set("Authorization", `Bearer ${token}`)
      .send({
        studentId: student._id.toString(),
        programId: program._id.toString(),
        intake: "September",
        note: "Applying for Fall intake",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe("draft");
  });

  test("should prevent duplicate applications for same student program intake", async () => {
    await Application.create({
      student: student._id,
      program: program._id,
      university: university._id,
      destinationCountry: "Canada",
      intake: "September",
      status: "draft",
    });

    const response = await request(app)
      .post("/api/applications")
      .set("Authorization", `Bearer ${token}`)
      .send({
        studentId: student._id.toString(),
        programId: program._id.toString(),
        intake: "September",
      });

    expect(response.statusCode).toBe(409);
    expect(response.body.success).toBe(false);
  });
});