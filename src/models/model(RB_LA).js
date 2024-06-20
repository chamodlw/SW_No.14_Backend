const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestResultSchema = new Schema({
    date: String,
    id: Number,
    testtype: String,
    testresult: String,
    // __v: Number
});


const TestResult = mongoose.model('testresults', TestResultSchema);
module.exports = TestResult;