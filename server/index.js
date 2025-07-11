const express = require("express");
const { authRoutes } = require("./src/Routes/User-Route");
const Connection = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    // origin: "http://192.168.1.42:5173",

    credentials: true,
  },
});

app.use(
  cors({
     origin: "http://localhost:5173",
    // origin: "http://192.168.1.42:5173",
    credentials: true,
      
  })
);

io.on("connection", (socket) => {
  console.log("connection on  socket  1");
  socket.on("message-user", (input) => {
    console.log("new user message ", input);
    io.emit("message-user", input);
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Create a API  ", success: true });
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const StartServer = async () => {
  try {
    await Connection();
    server.listen(process.env.PORT, () => {
      console.log(
        `Server is running on PORT http://localhost:${process.env.PORT}`
      );
    });
  } catch (error) {
    console.log("Something want errorr");
  }
};
StartServer();
server.js;
