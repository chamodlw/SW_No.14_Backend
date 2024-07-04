const Testresult = require('../models/model_operator');

const getResultByID = async (req, res) => {
    try {
        const id = req.params.id;
        const name= req.params.testName;  //get Id by parameter 
        console.log(`Fetching result with ID: ${id}, ${name}`);
        
        const result = await Testresult.findOne({ id: id , testtype: name});

        if (result) {
            res.json({ result });
        } else {
            res.status(404).json({ error: "result not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getResultByID = getResultByID;