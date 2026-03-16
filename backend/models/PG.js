const mongoose = require("mongoose");

const pgSchema = new mongoose.Schema({

  name: String,

  location: String,

  owner: String,

  contact: String,

  totalRooms: Number

});

module.exports = mongoose.model("PG", pgSchema);