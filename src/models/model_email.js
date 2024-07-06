const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = require('../config');
const { recommendations } = require('../controllers/controller_dapproval');

const sendApprovalEmail = async (reportId, doctorName, recommendation, patientId,patientEmail) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    
    const mailOptions = {
      from: EMAIL_USER,
      to: patientEmail,
      subject: 'Report Approved',
      text: `Patient ID :${patientId}
      The report with ID: ${reportId} has been approved by Dr. ${doctorName}.
      Recommendation : ${recommendation} `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};


module.exports = { sendApprovalEmail };
