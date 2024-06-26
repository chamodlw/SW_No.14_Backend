const Testresult = require('../models/model_operator');
const jsbarcode = require('jsbarcode');
const { createCanvas } = require('canvas');
const { v4: uuidv4 } = require('uuid');

const testresult = (req, res) => {
    const {id, nm, testtype, tr,uid } = req.body;
    const newTestresult = new Testresult({
        appointmentid:id||"1",
        name:nm||"kavini",
        testtype: testtype || "sugar", 
        testresults: tr || "21", 
        userid:uid||"200250203922"
    });
    newTestresult.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

const getResults = (req, res, next) => {
    Testresult.find()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

const updateResults = (req, res, next) => {
    const { userid, name, appointmentid, testtype, testresults } = req.body;
    
    Testresult.updateOne({ userid: userid }, { name: name, appointmentid: appointmentid, testtype: testtype, testresults: testresults})
    .then(response => {
        res.json({ response });
    })
    .catch(error => {
        res.status(400).json({ error: error.message });
    });
};

const deleteResults = (req, res, next) => {
    const id = req.body.id;
    Testresult.deleteOne({ id: id })
    .then(response => {
        res.json({ response });
    })
    .catch(error => {
        res.status(400).json({ error: error.message });
    });
};
module.exports = { testresult,getResults,updateResults,deleteResults};
