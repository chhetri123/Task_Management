const { port } = require("./config/envConfig");
const databaseConnect = require("./config/dbConfig");

const app = require("./index.js");

databaseConnect();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
