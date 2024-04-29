const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema= new Schema({
    // _id:String,
    fullname:String,
    email:String,
    address:String,
    nationalID:String,
    username:String,
    password:String,
    // --v:Number,

});

const User = mongoose.model('users',userSchema);
module.exports=User;
 