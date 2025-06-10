const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/chatApp")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// 🔹 Get messages between 2 users
app.get("/api/messages/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  console.log("user1 , user2")
  const messages = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 },
    ],
  }).sort({ createdAt: 1 });
  res.json(messages);
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Join room for private chat
  socket.on("joinRoom", ({ sender, receiver }) => {
    const room = [sender, receiver].sort().join("-");
    socket.join(room);
  });

  // Send private message
  socket.on("sendMessage", async ({ sender, receiver, text }) => {
    const message = new Message({ sender, receiver, text });
    await message.save();

    const room = [sender, receiver].sort().join("-");
    io.to(room).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
