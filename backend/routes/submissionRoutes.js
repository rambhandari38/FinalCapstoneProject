const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth = require("../middlewares/authMiddleware");
const Submission = require("../models/Submission");
const Assignment = require("../models/Assignment");

// Ensure the uploads directory exists
const uploadPath = "uploads/submissions/";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadPath),
  filename: (_, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/**
 * @route   POST /submissions
 * @desc    Submit assignment
 */
router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    const { assignmentId } = req.body;
    const file = req.file;

    if (!assignmentId || !file) {
      return res.status(400).json({ message: "Assignment ID and file are required." });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    const existing = await Submission.findOne({
      student: req.user._id,
      assignment: assignmentId,
    });

    if (existing) {
      return res.status(400).json({ message: "You already submitted this assignment." });
    }

    const submission = new Submission({
      student: req.user._id,
      assignment: assignmentId,
      file: file.path.replace(/\\/g, "/"),
      submittedAt: new Date(),
      grade: null,
      feedback: "",
    });

    await submission.save();

    res.status(201).json({ message: "Submission successful", submission });
  } catch (err) {
    console.error("❌ Submission error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /submissions/mine
 * @desc    Get logged-in student's submissions
 */
router.get("/mine", auth, async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user._id })
      .populate("assignment", "title dueDate")
      .sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
