const User = require("../Models/Auth-User");
const Singup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("name , email  , password  "  , name , email , password)
    const user = User.create({ name, email, password });
    await res.json({
      message: "Successfuly Acount Create ",
      user,
      success: true,
    });
  } catch (error) {
    console.log("Error in Singup Routes");
    res.json({ message: "Something want error ", success: false });
  }
};

module.exports = Singup;
