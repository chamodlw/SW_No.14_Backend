
const { sendRecheckEmail } = require('../models/model_recheck');

const recheckReport = async (req, res) => {
    const { reportId, doctorName,recommendation,patientId } = req.body;
  
    try {
      console.log(`Attempting to approve report ID: ${reportId} by Dr. ${doctorName},${recommendation}`);
      await sendRecheckEmail(reportId, doctorName,recommendation,patientId);
      console.log('Approval email sent successfully');
      res.status(200).send({ message: 'Recommend to recheck email sent successfully' });
    } catch (error) {
      console.error('Error approving report:', error);
      res.status(500).send({ message: 'Failed to send  email', error: error.message });
    }
  };
  

module.exports = { recheckReport };
