"use strict";
module.exports = {
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost/copjob-react",
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || "7d",
};
