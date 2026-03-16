const express = require("express");
const router = express.Router();

const Resident = require("../models/Resident");
const Room = require("../models/Room");


// GET all residents
router.get("/", async (req, res) => {

  try {

    const residents = await Resident.find();

    res.json(residents);

  } catch (error) {

    res.status(500).json({ message: "Error fetching residents" });

  }

});


// ADD resident
router.post("/", async (req, res) => {

  try {

    const { name, phone, pgId, roomId } = req.body;

    const resident = new Resident({

      name,
      phone,
      pgId,
      roomId,
      checkInDate: new Date()

    });

    const savedResident = await resident.save();


    // mark room occupied
    await Room.findByIdAndUpdate(roomId, {

      isOccupied: true

    });

    res.json(savedResident);

  } catch (error) {

    res.status(500).json({ message: "Error adding resident" });

  }

});


// DELETE resident
router.delete("/:id", async (req, res) => {

  try {

    const resident = await Resident.findById(req.params.id);

    if (!resident) {

      return res.status(404).json({ message: "Resident not found" });

    }

    // mark room vacant
    await Room.findByIdAndUpdate(resident.roomId, {

      isOccupied: false

    });

    await Resident.findByIdAndDelete(req.params.id);

    res.json({ message: "Resident deleted" });

  } catch (error) {

    res.status(500).json({ message: "Error deleting resident" });

  }

});


module.exports = router;