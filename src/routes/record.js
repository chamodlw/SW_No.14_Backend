const express = require("express");
const recordRoutes = express.Router();
const mongoose = require("mongoose");

const Record = mongoose.model("Record", {
    name: String,
    Age: String,
    Sex: String,
    PID: String,
    RegistarTime: String,
    CollectedTime: String,
    Reporton: String,
    testType: String,
    Result: String,
    positiveOrNegative: String,
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
  // Get a single record by id
  recordRoutes.route("/record/:id").get(async (req, res) => {
    try {
      const record = await Record.findById(req.params.id);
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = recordRoutes;