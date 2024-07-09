const { sendApprovalEmail } = require('../models/model_email');
const User = require('../models/model_login'); // Assuming your model is named 'model_login'

const approveReport = async (req, res) => {
  const { reportId, doctorName, recommendation, patientId } = req.body;

  try {
    const user = await User.findById(patientId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const userFirstName = user.firstname;
    const userLastName = user.lastname;
    const userEmail = user.email;
    const userSex = user.sex; // Ensure 'sex' is a field in your schema

    const data = {
      patientName: `${userFirstName} ${userLastName}`, // Combine first name and last name if needed
      PatientEmail: userEmail,
      PatientSex: userSex,
      ReportedOn: new Date().toLocaleDateString(), // Example date, adjust as needed
      tableData: [
        { testName: 'White Blood Cell count (WBC) ', result: '10000', min: 4000, max: 11000, unit: 'cs/μL' },
        { testName: 'Total Cholesterol	', result: '150', min: 0, max: 200, unit: 'mg/dL' },
      ],
      LabTechnician: 'Rajith Singh', // Example technician name, adjust as needed
      Doctor: doctorName,
      ReportId: reportId,
      Recommendation: recommendation,
      PatientID :patientId,
    };

    // Log the attempt to approve report
    const logMessage = `Patient ID :${patientId}\n
    Approved the  report ID: ${reportId} by Dr. ${doctorName},\n
     Recommendation: ${recommendation}`;
    console.log(logMessage);

    await sendApprovalEmail(userEmail, data, logMessage); // Send email using user's email
    console.log('Approval email sent successfully');
    res.status(200).send({ message: 'Approval email sent successfully' });

  } catch (error) {
    console.error('Error approving report:', error);
    res.status(500).send({ message: 'Failed to send approval email', error: error.message });
  }
};

module.exports = { approveReport };
