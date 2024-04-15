const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    name: String,
    test: String,
    test_tubes: String,
    blood_type: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
