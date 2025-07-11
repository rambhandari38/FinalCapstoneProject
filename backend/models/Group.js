const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  members: [String],
});

module.exports = mongoose.model("Group", GroupSchema);
