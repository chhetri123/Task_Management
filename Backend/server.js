const mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/config.env` });
const app = require("./index");

const port = process.env.PORT || 8000;

let db;
if (process.env.NODE_ENV === "development") {
  db = process.env.MONGODB_URI_DEV;
} else if (process.env.NODE_ENV === "production") {
  db = process.env.MONGODB_URI_PROD.replace(
    "<PASSWORD>",
    process.env.DB_PASSWORD
  );
}
console.log(db);
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
