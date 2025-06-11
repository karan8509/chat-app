const express = require("express");
const Singup = require("../Controllers/Auth-Controller");

const authRoutes = express.Router();

authRoutes.post("/singup", Singup);

module.exports = authRoutes;
