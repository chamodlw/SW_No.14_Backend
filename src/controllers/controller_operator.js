const Testresult = require('../models/model_operator');

const testresult = (req, res) => {
    const { date, id, testtype, testresult } = req.body;
    const newTestresult = new Testresult({
        date: date || "2024.1.2", // Use provided date or default
        id: id || "1", // Use provided id or default
        testtype: testtype || "sugar", // Use provided testtype or default
        testresult: testresult || "21", // Use provided testresult or default
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
