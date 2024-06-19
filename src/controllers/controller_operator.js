const Testresult = require('../models/model_operator');

const testresult = (req, res) => {
    const { date, id, testtype, testresult,uid } = req.body;
    const newTestresult = new Testresult({
        date: date || "2024.1.2", 
        reportid: id || "1", 
        testtype: testtype || "sugar", 
        testresult: testresult || "21", 
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

module.exports = { testresult };
