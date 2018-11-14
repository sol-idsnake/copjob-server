"use strict";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  name: {
    firstName: { type: String },
    lastName: { type: String },
  },
  email: { type: String },
  phone: { type: String },
  department: { type: String },
  premium: { type: Boolean, default: false },
});

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    department: this.department,
    premium: this.premium,
  };
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
