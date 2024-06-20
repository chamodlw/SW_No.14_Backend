// model2.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    id:Number,
    selectTests: [{
        testId: Number,
        testName: String
    }],
    pid:String,
    state:String,
    pname:String,
})


const Appointment =mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
