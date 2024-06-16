const Recommendation = require('../models/model_dapproval');

const recommendations = (req, res) => {
    const { date, id, recommendation,docname } = req.body;
    const newRecommendation = new Recommendation({
        date: date,
        id: id,
        recommendation: recommendation,
        docname:docname,
    });
    newRecommendation.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};


module.exports = { recommendations };
