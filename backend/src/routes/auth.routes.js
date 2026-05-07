// const express = require("express");
// const { register, login, me } = require("../controllers/authController");
// const { requireAuth } = require("../middleware/authMiddleware");
// const { authRateLimiter } = require("../middleware/rateLimiter");

// const router = express.Router();

// router.post("/register", authRateLimiter, register);
// router.post("/login", authRateLimiter, login);
// router.get("/me", requireAuth, me);

// module.exports = router;

// const express = require("express");
// const { register, login, me } = require("../controllers/auth.controller");
// const { requireAuth } = require("../middleware/auth.middleware");
// const { authRateLimiter } = require("../middleware/rateLimiter");

// const router = express.Router();

// router.post("/register", authRateLimiter, register);
// router.post("/login", authRateLimiter, login);
// router.get("/me", requireAuth, me);

// module.exports = router;

const express = require("express");
const { register, login, me, updateProfile } = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const { authRateLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/register", authRateLimiter, register);
router.post("/login", authRateLimiter, login);
router.get("/me", requireAuth, me);
router.patch("/me", requireAuth, updateProfile);

module.exports = router;