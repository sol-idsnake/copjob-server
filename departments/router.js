const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { Department } = require("./models");

const { CLIENT_ORIGIN } = require("../config");

const app = express();
const jsonParser = bodyParser.json();
app.use(express.json());

router.get("/get", (req, res) => {
  Department.find()
    .then(departments => {
      res.json(departments.map(department => department.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.post("/add", jsonParser, (req, res) => {
  Department.create({
    name: req.body.name,
    location: req.body.location,
    state: req.body.state,
    position: req.body.position,
    salary: req.body.salary,
    age: req.body.age,
    citizenship: req.body.citizenship,
    url: req.body.url,
    description: req.body.description,
  })
    .then(department => {
      console.log(department + " before serialize");
      res.status(201).json(department.serialize());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Can't create department" });
    });
});

module.exports = router;
