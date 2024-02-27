// model2.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentsSchema = new Schema({
    a_id: { type: Number, required: true }, // Set a_id as required
    tests: [{ id: Number, name: String }] // Array to store test ids and names
});

const Appointment = mongoose.model('Appointment', AppointmentsSchema);

module.exports = Appointment;
