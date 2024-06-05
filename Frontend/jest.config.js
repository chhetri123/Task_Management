module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
