const express = require("express");
const { signup, login } = require("../Controllers/Auth-Controller");

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);

module.exports = { authRoutes };
