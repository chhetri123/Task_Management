require("dotenv").config();

const env = process.env.NODE_ENV || "development";

if (env === "development") {
  require("dotenv").config({ path: ".env.development" });
} else if (env === "production") {
  require("dotenv").config({ path: ".env.production" });
}
module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  mongodb_url: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpireAt: process.env.JWT_EXPIRE_AT,
};
