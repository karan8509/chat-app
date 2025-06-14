const express = require("express");
const {authRoutes} = require("./src/Routes/User-Route");
const cors = require("cors");
const Connection = require("./config/db");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Create a API  ", success: true });
});
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);


const StartServer = async () => {
  try {
    await Connection();
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on PORT http://localhost:${process.env.PORT}`
      );
    });
  } catch (error) {
    console.log("Something want errorr");
  }
};

StartServer();
