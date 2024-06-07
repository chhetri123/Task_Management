const { port } = require("./config/envConfig");
const databaseConnect = require("./config/dbConfig");
const app = require("./index");
databaseConnect();

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
module.exports = app;
