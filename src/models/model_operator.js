
const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const testresultSchema =new Schema({
    pid:String,
    pname:String,
    id:Number,
    testtype:String,
    testresults:String,
})
const Testresult =mongoose.model('Testresult', testresultSchema);

module.exports =Testresult;