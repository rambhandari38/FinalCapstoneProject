const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const auth = require("../middlewares/authMiddleware");
const requireRole = require("../middlewares/roleMiddleware");

// 🧑‍🏫 Get attendance for a specific date (for teachers)
router.get("/", auth, requireRole(["teacher"]), async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ message: "Date query parameter is required" });
  }

  try {
    // Use start/end of the day for accurate matching (ignore time)
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const attendances = await Attendance.find({
      date: { $gte: dayStart, $lte: dayEnd }
    }).populate("student", "username");

    res.json(attendances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🧑‍🏫 Mark attendance in bulk (for teachers)
router.post("/", auth, requireRole(["teacher"]), async (req, res) => {
  const { attendanceList, date } = req.body;

  if (!attendanceList || !date) {
    return res.status(400).json({ message: "Attendance list and date are required" });
  }

  try {
    // Normalize date to start of day
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    // Remove existing attendance for that date
    await Attendance.deleteMany({
      date: { $gte: dayStart, $lt: new Date(dayStart.getTime() + 24 * 60 * 60 * 1000) }
    });

    // Prepare new attendance records
    const records = attendanceList.map(({ studentId, present }) => ({
      student: studentId,
      date: dayStart,
      present,
    }));

    await Attendance.insertMany(records);

    res.json({ message: "Attendance saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👨‍🎓 Student views their own attendance
router.get("/my-attendance", auth, requireRole(["student"]), async (req, res) => {
  try {
    // Sort by date descending
    const records = await Attendance.find({ student: req.user._id }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
