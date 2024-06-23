const Testresult = require('../models/model_operator');

const testresult = (req, res) => {
    const {id, nm, testtype, testresult,uid } = req.body;
    const newTestresult = new Testresult({
        appointmentid:id||"1",
        name:nm||"kavini",
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
