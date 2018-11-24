"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
  },
  name: {
    firstName: { type: String },
    lastName: { type: String },
  },
  phone: { type: String },
  department: { type: String },
  premium: { type: Boolean, default: false },
});

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    email: this.email,
    name: this.name,
    phone: this.phone,
    department: this.department,
    premium: this.premium,
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
