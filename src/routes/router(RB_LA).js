const express = require('express');
const router =express.Router();
const mongoose = require('mongoose');

const Record = mongoose.model("Record",{
    fullname:String,
    reportID:String,
    nationalID:String,
});

// get all records

router.route("/records").get(async(req,res)=>{
    try{
        const records = await Record.find();
        res.send(records);
    }catch(error){
        res.status(500).jason({error: error.message});}})

module.exports = router;
