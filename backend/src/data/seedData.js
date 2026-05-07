module.exports = {
  universities: [
    {
      name: "University of Windsor",
      country: "Canada",
      city: "Windsor",
      partnerType: "direct",
      qsRanking: 601,
      scholarshipAvailable: true,
      popularScore: 88,
      tags: ["Engineering", "Computer Science"],
      websiteUrl: "https://www.uwindsor.ca"
    },
    {
      name: "University of Portsmouth",
      country: "United Kingdom",
      city: "Portsmouth",
      partnerType: "recruitment-partner",
      qsRanking: 631,
      scholarshipAvailable: true,
      popularScore: 79,
      tags: ["Business", "Technology"],
      websiteUrl: "https://www.port.ac.uk"
    },
    {
      name: "University of Central Lancashire",
      country: "United Kingdom",
      city: "Preston",
      partnerType: "institution-partner",
      qsRanking: 901,
      scholarshipAvailable: true,
      popularScore: 85,
      tags: ["Health Sciences", "Education"],
      websiteUrl: "https://www.uclan.ac.uk"
    }
  ],
  programs: [
    {
      universityName: "University of Windsor",
      university: null, // Will be mapped in seed.js
      country: "Canada",
      city: "Windsor",
      title: "Master of Applied Computing",
      field: "Computer Science",
      degreeLevel: "master",
      tuitionFeeUsd: 22800,
      intakes: ["September", "May"],
      durationMonths: 16,
      minimumIelts: 6.5,
      scholarshipAvailable: false,
      stem: true
    },
    {
      universityName: "University of Portsmouth",
      university: null,
      country: "United Kingdom",
      city: "Portsmouth",
      title: "MSc Computer Science",
      field: "Computer Science",
      degreeLevel: "master",
      tuitionFeeUsd: 18500,
      intakes: ["September", "January"],
      durationMonths: 12,
      minimumIelts: 6.0,
      scholarshipAvailable: true,
      stem: true
    }
  ],
  students: [
    {
      fullName: "Aarav Malhotra",
      email: "aarav@example.com",
      password: "Candidate123!",
      role: "student",
      targetCountries: ["Canada", "United Kingdom"],
      interestedFields: ["Computer Science"],
      preferredIntake: "September",
      maxBudgetUsd: 25000,
      englishTest: { exam: "IELTS", score: 7.0 },
      profileComplete: true
    },
    {
      fullName: "Priya Sharma",
      email: "priya@example.com",
      password: "Candidate123!",
      role: "counselor",
      profileComplete: true
    }
  ],
  applications: [
    {
      studentEmail: "aarav@example.com",
      programTitle: "Master of Applied Computing",
      intake: "September",
      status: "submitted",
      timeline: [
        { status: "draft", note: "Application created by student." },
        { status: "submitted", note: "Application submitted." }
      ]
    }
  ]
};