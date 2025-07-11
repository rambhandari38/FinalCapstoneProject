const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/authMiddleware");
const requireRole = require("../middlewares/roleMiddleware");

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/assignments/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST /assignments - Create new assignment
router.post(
  "/",
  auth,
  requireRole(["teacher"]),
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, content, dueDate } = req.body;
      const file = req.file;

      if (!title || !file || !dueDate) {
        return res
          .status(400)
          .json({ message: "Title, file and due date are required." });
      }

      const assignment = new Assignment({
        title,
        content,
        dueDate,
        file: file.path.replace(/\\/g, "/"), // Normalize Windows path
        teacher: req.user._id,
      });

      await assignment.save();
      res.status(201).json(assignment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /assignments - Get all assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find().populate("teacher", "username");
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
