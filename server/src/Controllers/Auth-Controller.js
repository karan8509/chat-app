const User = require("../Models/User-Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(" name , email  , password ", name, email, password);

    const storeRefreshToken = (userID) => {
      const Refrenshtoken = jwt.sign({ userID }, process.env.SECRET_TOKEN_KEY, {
        expiresIn: "3d",
      });
      return { Refrenshtoken };
    };

    const setcookies  = (res, refreshToken) => {
      res.cookie("token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 2 * 24 * 60 * 60 * 1000,
      });
    };

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });
    const { Refrenshtoken } = storeRefreshToken(user);
    setcookies (res, Refrenshtoken);
    res.json({
      message: "Successfully Account Created",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in Signup Route:", error.message);
    res.json({
      message:
        "Internal server error. Please try again later." || error.message,
      success: false,
    });
  }
};

const login = async (req, res) => {

   const storeRefreshToken = (userID) => {
      const Refrenshtoken = jwt.sign({ userID }, process.env.SECRET_TOKEN_KEY, {
        expiresIn: "3d",
      });
      return { Refrenshtoken };
    };

    const setcookies  = (res, refreshToken) => {
      res.cookie("token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 2 * 24 * 60 * 60 * 1000,
      });
    };
  try {
    const { email, password } = req.body;
    const existEmail = await User.findOne({ email });
    if (!existEmail) {
      return res.json({
        message: "Email not found",
        success: false,
      });
    }
    const comparePassword = await bcrypt.compare(password, existEmail.password);
    if (!comparePassword) {
      return res.json({
        message: "Incorrect password",
        success: false,
      });
    }
   const { Refrenshtoken } = storeRefreshToken(existEmail._id);
    setcookies (res, Refrenshtoken);
    res.json({
      message: "Login successful",
      success: true,
      user: existEmail,
    });
  } catch (error) {
    console.error("Error in Login Route:", error.message);
    res.json({
      message: "Internal server error. Please try again later.",
      success: false,
    });
  }
};

module.exports = { signup, login };
