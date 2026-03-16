const express = require("express");
const router = express.Router();

const PG = require("../models/PG");
const Room = require("../models/Room");


// GET all PGs
router.get("/", async (req, res) => {

  try {

    const pgs = await PG.find();

    res.json(pgs);

  } catch (error) {

    res.status(500).json({ message: "Error fetching PGs" });

  }

});


// ADD PG
router.post("/", async (req, res) => {

  try {

    const { name, location, owner, contact, totalRooms } = req.body;

    const newPG = new PG({
      name,
      location,
      owner,
      contact,
      totalRooms
    });

    const savedPG = await newPG.save();


    // automatically create rooms
    const rooms = [];

    for (let i = 1; i <= totalRooms; i++) {

      rooms.push({
        roomNumber: i,
        pgId: savedPG._id,
        isOccupied: false
      });

    }

    await Room.insertMany(rooms);

    res.json(savedPG);

  } catch (error) {

    res.status(500).json({ message: "Error adding PG" });

  }

});

module.exports = router;