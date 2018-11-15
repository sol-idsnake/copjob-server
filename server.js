require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const departmentRouter = require("./departments/router");
const morgan = require("morgan");
const cors = require("cors");
const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require("./config");
const app = express();

app.use(morgan("dev"));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", CLIENT_ORIGIN);
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204);
//   }
//   next();
// });

const corsOptions = {
  origin: /quizzical-clarke-da2ef3\.netlify\.com$/,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: "Content-Type",
  optionsSuccessStatus: 200
}

app.use("/dept", cors(corsOptions), departmentRouter);

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
