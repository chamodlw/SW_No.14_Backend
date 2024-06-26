const express = require("express");
const recordRoutes = express.Router();
const mongoose = require("mongoose");

// Defining (or) Building : Record Model
const Record = mongoose.model("Record", {
  id:Number,
  selectTests: [{
      testId: Number,
      testName: String
  }],
  pid:Number,
  state:String,
  pname:String,
});
// All Routes related to records
// Get all records
recordRoutes.route("/record").get(async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = recordRoutes;
