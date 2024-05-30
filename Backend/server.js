const mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/config.env` });
const app = require("./index");

const port = process.env.PORT || 8000;
const db = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose
  .connect(db)
  .then(() => {
    console.log("DB connected");
  })
  .catch();
const server = app.listen(port, () => console.log(`listening on port ${port}`));

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
