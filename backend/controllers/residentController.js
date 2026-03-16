const Resident = require("../models/Resident");
const Room = require("../models/Room");

exports.createResident = async (req, res) => {

  const room = await Room.findById(req.body.roomId);

  if(room.occupants >= room.capacity){
    return res.json({message:"Room is full"});
  }

  const resident = await Resident.create(req.body);

  room.occupants += 1;
  await room.save();

  res.json(resident);
};

exports.getResidents = async (req,res)=>{
  const residents = await Resident.find()
  .populate("pgId")
  .populate("roomId");

  res.json(residents);
};