const mongoose = require("mongoose");

const Connection = async () => {
  try {
    await mongoose.connect(process.env.URL_DATABASE);
    console.log("ON DATABASE");
  } catch (error) {
    console.log("NOT CONNECTED DATABASE", error.message);
  }
};
module.exports = Connection;
