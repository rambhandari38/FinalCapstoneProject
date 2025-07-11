const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  present: { type: Boolean, default: false },
  // Optional: you can add classId, subject, teacher if needed
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
