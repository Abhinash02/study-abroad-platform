
// const cors = require("cors");
// const express = require("express");
// const morgan = require("morgan");
// const helmet = require("helmet");
// const env = require("./config/env");

// const applicationRoutes = require("./routes/application.routes");
// const authRoutes = require("./routes/auth.routes");
// const dashboardRoutes = require("./routes/dashboard.routes");
// const healthRoutes = require("./routes/health.routes");
// const programRoutes = require("./routes/program.routes");
// const recommendationRoutes = require("./routes/recommendation.routes");
// const universityRoutes = require("./routes/university.routes");
// const supportRoutes = require("./routes/support.routes");
// const compareRoutes = require("./routes/compare.routes");
// const errorHandler = require("./middleware/errorHandler");
// const notFound = require("./middleware/notFound");



// const app = express();

// app.use(
//   cors({
//     origin: env.clientUrl,
//     credentials: true,
//   })
// );
// app.use(helmet());
// app.use(express.json());
// app.use(morgan("dev"));


// app.use("/api/health", healthRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/universities", universityRoutes);
// app.use("/api/programs", programRoutes);
// app.use("/api/recommendations", recommendationRoutes);
// app.use("/api/applications", applicationRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/support", supportRoutes);
// app.use("/api/programs/compare", compareRoutes);

// app.use(notFound);
// app.use(errorHandler);

// module.exports = app;

const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const env = require("./config/env");

const applicationRoutes = require("./routes/application.routes");
const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const healthRoutes = require("./routes/health.routes");
const programRoutes = require("./routes/program.routes");
const recommendationRoutes = require("./routes/recommendation.routes");
const universityRoutes = require("./routes/university.routes");
const supportRoutes = require("./routes/support.routes");
const compareRoutes = require("./routes/compare.routes");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://study-abroad-platform-seven.vercel.app",
  env.clientUrl,
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/programs/compare", compareRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;