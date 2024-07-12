//model3.js
const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const recommendationSchema =new Schema({
    
    id:Number,
    recommendation:String,
    docname:String,
    patientId:String,
   
})
const Recommendation =mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;