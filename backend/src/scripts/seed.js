const connectDatabase = require("../config/database");
const Application = require("../models/Application");
const Program = require("../models/Program");
const Student = require("../models/Student");
const University = require("../models/University");
const seedData = require("../data/seedData");

async function seed() {
  await connectDatabase();

  await Promise.all([
    Application.deleteMany({}),
    Program.deleteMany({}),
    Student.deleteMany({}),
    University.deleteMany({}),
  ]);

  const universities = await University.insertMany(seedData.universities);

  const universityByName = universities.reduce((acc, university) => {
    acc[university.name] = university;
    return acc;
  }, {});

  const programs = await Program.insertMany(
    seedData.programs.map((program) => ({
      ...program,
      university: universityByName[program.universityName]._id,
    }))
  );

  const programByTitle = programs.reduce((acc, program) => {
    acc[program.title] = program;
    return acc;
  }, {});

  const students = await Student.create(seedData.students);

  const studentByEmail = students.reduce((acc, student) => {
    acc[student.email] = student;
    return acc;
  }, {});

  const applications = seedData.applications.map((application) => {
    const student = studentByEmail[application.studentEmail];
    const program = programByTitle[application.programTitle];
    const university = universityByName[program.universityName];

    return {
      student: student._id,
      program: program._id,
      university: university._id,
      destinationCountry: program.country,
      intake: application.intake,
      status: application.status,
      timeline: application.timeline,
    };
  });

  await Application.insertMany(applications);

  console.log("Seed completed successfully.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});