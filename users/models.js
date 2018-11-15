"use strict";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  name: {
    firstName: { type: String },
    lastName: { type: String },
  },
  email: { type: String, unique: true, required: true },
  phone: { type: String },
  department: { type: String },
  premium: { type: Boolean, default: false },
});

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    department: this.department,
    premium: this.premium,
  };
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
