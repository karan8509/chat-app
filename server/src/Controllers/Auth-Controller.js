const User = require("../Models/User-Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const storeRefreshToken = async (userID) => {
  const Refrenshtoken = jwt.sign({ userID }, process.env.SECRET_TOKEN_KEY, {
    expiresIn: "7d",
  });
  return { Refrenshtoken };
};

const setcookies = async (res, Refrenshtoken) => {
  res.cookie("token", Refrenshtoken, {
    httpOnly: false,
    secure: false,
    sameSite: "strict",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(" name , email  , password ", name, email, password);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });
    const { Refrenshtoken } = await storeRefreshToken(user._id);
    await setcookies(res, Refrenshtoken);
    const token  = req.cookies.token;
    console.log("token--->" , token)
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
    setcookies(res, Refrenshtoken);
  const token = req.cookies.token;
  console.log("new one token again " , token)
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

const  getProfile = async (req,res) => {
  try {
    const user = req.user
     res.json(user)
  } catch (error) {
     res.json(error.message)
  }
}



module.exports = { signup, login  , getProfile};

