const Testresult = require('../models/model_operator');


const testresult = (req, res) => {
    const {id, pname, testName, testresults,pid } = req.body;
    const newTestresult = new Testresult({
        id:id||"1",
        pname:pname||"kavini",
        testtype: testName || "sugar", 
        testresults: testresults || "21", 
        pid:pid||"200250203922"
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
    const { pid, pname, id, testName, testresults } = req.body;
    
    Testresult.updateOne({ pid: pid }, { pname:  pname, id: id, testtype: testName, testresults: testresults})
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
