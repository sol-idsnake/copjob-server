require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const departmentRouter = require("./departments/router");
const morgan = require("morgan");
const cors = require("cors");
const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require("./config");
const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: "https://quizzical-clarke-da2ef3.netlify.com/",
    methods: "GET,PUT,POST,DELETE,OPTIONS",
    preflightContinue: false,
    headers:
      "Cache-Control, Pragma, Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Headers": "Authorization, Content-Type" // headers allowed
  })
);

app.use("/dept", departmentRouter);

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      { useNewUrlParser: true },
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
