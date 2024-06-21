const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testTubeSchema = new Schema({
    tube_id: Number,
    tube_type: String,
    description: String,
    expire_date: String,
    manufacturer: String,
    location: String,
});

const TestTube = mongoose.model('TestTube', testTubeSchema);

module.exports = TestTube;