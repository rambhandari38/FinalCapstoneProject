const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const requireRole = require("../middlewares/roleMiddleware");
const User = require("../models/User");  // add this

const {
  createUser,
  changePassword,
  changeUsername
} = require("../controllers/userController");

router.post("/create-user", auth, requireRole(['superadmin']), createUser);
router.put("/change-password", auth, requireRole(['superadmin', 'admin', 'teacher', 'student']), changePassword);
router.put("/change-username", auth, requireRole(['superadmin']), changeUsername);

// New endpoint to get students only
router.get(
  "/students",
  auth,
  requireRole(['teacher', 'admin', 'superadmin']),
  async (req, res) => {
    try {
      const students = await User.find({ role: "student" }).select("_id username");
      res.json(students);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// A simple GET endpoint to test access
router.get("/hello", (req, res) => {
  res.json({ message: "Hello! You have accessed the GET endpoint successfully." });
});

module.exports = router; // ✅ This must be router
