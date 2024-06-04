const mongoose = require("mongoose");
const { mongodb_url } = require("./envConfig");
const databaseConnect = async () => {
  try {
    await mongoose.connect(mongodb_url);
    console.log("DB connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = databaseConnect;
