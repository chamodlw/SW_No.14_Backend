
const { sendApprovalEmail } = require('../models/model_email');

const approveReport = async (req, res) => {
    const { reportId, doctorName,recommendation,patientId } = req.body;
  
    try {
      console.log(`Attempting to approve report ID: ${reportId} by Dr. ${doctorName},${recommendation}`);
      await sendApprovalEmail(reportId, doctorName,recommendation,patientId);
      console.log('Approval email sent successfully');
      res.status(200).send({ message: 'Approval email sent successfully' });
    } catch (error) {
      console.error('Error approving report:', error);
      res.status(500).send({ message: 'Failed to send approval email', error: error.message });
    }
  };
  

module.exports = { approveReport };
