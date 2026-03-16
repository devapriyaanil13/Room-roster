const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({

  name: String,

  phone: String,

  pgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PG"
  },

  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  },

  checkInDate: Date

});

module.exports = mongoose.model("Resident", residentSchema);