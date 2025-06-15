const User = require("../Models/User-Model")

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("name , email  , password  ", name, email, password);

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPassword });

    res.status(201).json({
      message: "Successfully Account Created",
      user,
      success: true,
    });
  } catch (error) {
    console.error("Error in Signup Route:", error.message); 
    res.status(500).json({
      message: "Internal server error. Please try again later.",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existEmail = await User.findOne({ email });
    if (!existEmail) {
      return res.status(404).json({
        message: "Email not found",
        success: false,
      });
    }

    const comparePassword = await bcrypt.compare(password, existEmail.password);
    if (!comparePassword) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: existEmail,
      success: true,
    });
  } catch (error) {
    console.error("Error in Login Route:", error.message); 
    res.status(500).json({
      message: "Internal server error. Please try again later.",
      success: false,
    });
  }
};

module.exports = { signup, login };
