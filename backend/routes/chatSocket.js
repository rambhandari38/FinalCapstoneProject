const Message = require("../models/Message");
const User = require("../models/User"); // ✅ Import User model

const activeUsers = {}; // socket.id => username

module.exports = function (io, socket) {
  // ✅ Function to emit all users with online status
  async function emitAllUsers() {
    const allUsers = await User.find({}, "username"); // Get all usernames
    const usersWithStatus = allUsers.map((user) => ({
      username: user.username,
      online: Object.values(activeUsers).includes(user.username),
    }));
    io.emit("all users", usersWithStatus);
  }

  socket.on("set username", async (username) => {
    socket.username = username;
    activeUsers[socket.id] = username;

    // ✅ Create user if not exists
    let existingUser = await User.findOne({ username });
    if (!existingUser) {
      await new User({ username }).save();
    }

    await emitAllUsers(); // ✅ Emit all users with online status

    // ✅ Send previous messages
    const messages = await Message.find({ visibleTo: username }).sort({
      timestamp: 1,
    });
    socket.emit("load messages", messages);
  });

  socket.on("private message", async ({ to, content }) => {
    const from = socket.username;
    if (!from || !to || !content) return;

    const msg = new Message({
      from,
      to,
      content,
      visibleTo: [from, to],
    });

    await msg.save();

    const targetSocketId = Object.keys(activeUsers).find(
      (key) => activeUsers[key] === to
    );
    if (targetSocketId) {
      io.to(targetSocketId).emit("private message", msg);
    }

    socket.emit("private message", msg);
  });

  socket.on("delete message for me", async ({ id }) => {
    const msg = await Message.findById(id);
    if (msg) {
      msg.visibleTo = msg.visibleTo.filter((u) => u !== socket.username);
      await msg.save();
      socket.emit("delete message locally", id);
    }
  });

  socket.on("delete message for everyone", async (id) => {
    await Message.findByIdAndDelete(id);
    io.emit("delete message globally", id);
  });

  socket.on("disconnect", async () => {
    delete activeUsers[socket.id];
    await emitAllUsers(); // ✅ Update status on disconnect
  });
};
