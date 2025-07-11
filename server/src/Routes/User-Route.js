const express = require("express");
const { signup, login  , getProfile} = require("../Controllers/Auth-Controller");
const verifyTokenAuth = require("../Middleware/auth.Middleware")

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/profile" , verifyTokenAuth, getProfile)

module.exports = { authRoutes };
