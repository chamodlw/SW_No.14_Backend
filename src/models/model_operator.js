
const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const testresultSchema =new Schema({
    appointmentid:String,
    name:String,
    userid:String,
    testtype:String,
    testresult:String,
})
const Testresult =mongoose.model('Testresult', testresultSchema);

module.exports =Testresult;