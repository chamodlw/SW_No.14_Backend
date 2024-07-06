const Testresult = require('../models/model_operator');

const getResultByID = async (req, res) => {
    try {
        const id = req.params.id;
      //get Id by parameter 
        console.log(`Fetching result with ID: ${id}`);
        
        const result = await Testresult.findOne({ testid: id});

        if (result) {
            res.json({ result });
        } else {
            res.status(404).json({ error: "result not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getResult = async (req, res) => {
    try {
        const result = await Testresult.find();
        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getResultByID = getResultByID;
exports.getResult = getResult;