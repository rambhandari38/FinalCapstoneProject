const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    role,
    createdBy: req.user._id,
  });

  await newUser.save();
  res.status(201).json({ message: "User created" });
};

exports.changePassword = async (req, res) => {
  const { targetUsername, newPassword } = req.body;
  const targetUser = await User.findOne({ username: targetUsername });
  if (!targetUser) return res.status(404).json({ message: "User not found" });

  // Admins can only change their own or other's passwords; students/teachers only own
  if (req.user.role === "student" || req.user.role === "teacher") {
    if (targetUser._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  targetUser.password = hashedPassword;
  await targetUser.save();
  res.json({ message: "Password changed" });
};

exports.changeUsername = async (req, res) => {
  const { targetUsername, newUsername } = req.body;

  const targetUser = await User.findOne({ username: targetUsername });
  if (!targetUser) return res.status(404).json({ message: "User not found" });

  targetUser.username = newUsername;
  await targetUser.save();
  res.json({ message: "Username updated" });
};
