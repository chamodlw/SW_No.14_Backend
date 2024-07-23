const Recommendation = require("../models/model_dapproval");


const getRecommendationByID = async (req, res) => {
    try {
        const id = req.params.id;
        //get Id by parameter 
        console.log(`Fetching Recommendation data from ID: ${id}`);
        
        const result = await Recommendation.findOne({id:id});

        if (result) {
            res.json({ result });
        } else {
            res.status(404).json({ error: "result not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecommendationByID = getRecommendationByID;