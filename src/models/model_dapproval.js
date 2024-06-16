//model3.js
const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const recommendationSchema =new Schema({
    date:String,
    id:Number,
    recommendation:String,
    docname:String,
})
const Recommendation =mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;