const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  avatar: {
    type: String,
    default: ""
  },

  budget: {
    type: Number,
    default: 0
  },

  locationPreference: {
    type: String,
    default: ""
  },

  gender: {
    type: String,
    default: "Any"
  },

  lookingFor: {
    type: String,
    enum: ["Roommate", "PG", "Both", ""],
    default: ""
  },

  bio: {
    type: String,
    default: ""
  },

  preferredGender: {
    type: String,
    default: "Any"
  },

  showToNonSelectedGender: {
    type: Boolean,
    default: true
  },

  matches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]

});

module.exports = mongoose.model("User", userSchema);