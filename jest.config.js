module.exports = {
  collectCoverage: true,
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/server/",
    "/log/",
    "/data/",
    "/config/",
    "/src/",
    "/coverage/",
  ],
};
