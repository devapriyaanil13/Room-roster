const PG = require("../models/PG");

exports.createPG = async (req, res) => {
  try {
    const pg = await PG.create(req.body);
    res.json(pg);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPGs = async (req, res) => {
  const pgs = await PG.find();
  res.json(pgs);
};