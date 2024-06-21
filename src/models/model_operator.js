
const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const testresultSchema =new Schema({
    date:String,
    id:Number,
    testtype:String,
    testresult:String,
})
const Testresult =mongoose.model('Testresult', testresultSchema);

module.exports =Testresult;