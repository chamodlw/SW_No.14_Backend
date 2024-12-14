// src/models/testTubeModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testTubeSchema = new Schema({
    _id: String, // Use string to store the barcode ID as the primary key
    tube_type: { type: String, required: true },
    description: { type: String, required: true },
    expire_date: { type: String, required: true },
    manufacturer: { type: String, required: true },
    location: { type: String, required: true },
});

const TestTube = mongoose.model('TestTube', testTubeSchema);

module.exports = TestTube;
