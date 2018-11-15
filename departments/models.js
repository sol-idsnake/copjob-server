"use strict";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const departmentSchema = mongoose.Schema({
  name: { type: String },
  location: { type: String },
  state: { type: String },
  position: { type: String },
  salary: {
    minRange: { type: Number },
    maxRange: { type: Number },
  },
  age: { type: Number },
  citizenship: { type: Boolean },
  url: { type: String },
  description: { type: String },
});

departmentSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    location: this.location,
    state: this.state,
    position: this.position,
    salary: this.salary,
    age: this.age,
    citizenship: this.citizenship,
    url: this.url,
    description: this.description,
  };
};

// first arg passed to model is capital and singular, whereas mongo looks for the same name in plural and
// non-capitalized in the collections. E.G 'POST', but the collections name is 'posts'
const Department = mongoose.model("Department", departmentSchema);

module.exports = { Department };
