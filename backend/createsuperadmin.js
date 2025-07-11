// createSuperadmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User"); // adjust path if needed

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const exists = await User.findOne({ username: "superadmin" });
  if (!exists) {
    const hashed = await bcrypt.hash("admin123", 10);
    await User.create({
      username: "superadmin",
      password: hashed,
      role: "superadmin",
      createdBy: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("✅ Superadmin created: superadmin / admin123");
  } else {
    console.log("⚠️ Superadmin already exists");
  }
  mongoose.disconnect();
});
