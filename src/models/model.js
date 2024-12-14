const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    name: String,
    test: String,
    test_tubes: String,
    test_tube_id: String,
    blood_type: String,
});

const TestingUser = mongoose.model('TestingUser', userSchema);

module.exports = TestingUser;
