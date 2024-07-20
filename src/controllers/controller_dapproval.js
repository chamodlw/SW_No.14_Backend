const Recommendation = require('../models/model_dapproval');
const Appointment = require('../models/model-appmng');

// Function to handle saving recommendations
const recommendations = (req, res) => {
    const {  id, recommendation, docname, pid } = req.body;
    const newRecommendation = new Recommendation({
       date:new Date().toLocaleDateString(),
        id: id,
        recommendation: recommendation,
        docname: docname,
        patientId: pid,
    });

    newRecommendation.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

// Function to get patient ID based on report ID
const getPatientIdByReportId = async (req, res) => {
    try {
        const reportId = req.params.reportId; // Access reportId from req.params

        // Fetch the appointment using the report ID
        const appointment = await Appointment.findOne({ id: reportId });

        // Check if the appointment exists
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        // Send the patient ID in the response
        res.json({ patientId: appointment.pid });
    } catch (error) {
        console.error('Error in getPatientIdByReportId:', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = { recommendations, getPatientIdByReportId };

