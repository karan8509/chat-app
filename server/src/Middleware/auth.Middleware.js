// const jwt = require("jsonwebtoken");
// require("dotenv").config()
// const verifyTokenAuth = async (req, res, next) => {
//   const token = req.cookies.token;
//   console.log("===>", token);
//   if (!token) {
//     await res.json({ message: "Unauthorized -  No Token  provided"});
//     return;
//   }
//   try {
//     const decode = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
//     req.user = decode;
//     next();
//   } catch (error) {
//     res.json({ message: "Unauthorized - Invalid token" });
//   }
// };

// module.exports = verifyTokenAuth;


const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyTokenAuth = (req, res, next) => {
  const token = req.cookies.token;
  console.log("===>", token);

  if (!token) {
     res.status(401).json({ message: "Unauthorized - No Token provided" });
     return
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = verifyTokenAuth;
