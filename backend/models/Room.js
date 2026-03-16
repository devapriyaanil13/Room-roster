const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  pgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PG"
  },
  roomNumber: Number,
  type: String,
  capacity: Number,
  occupants: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Room", roomSchema);