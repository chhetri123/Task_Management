module.exports = {
  mongodb_url: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpireAt: process.env.JWT_EXPIRE_AT,
};
