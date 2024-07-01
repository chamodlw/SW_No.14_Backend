const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = require('../config');
const { recommendations } = require('../controllers/controller_dapproval');

const sendRecheckEmail = async (reportId, doctorName, recommendation, patientId) => {
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
      to: EMAIL_USER,
      subject: 'Recommend to Recheck',
      text: `Patient ID :${patientId}
      The report with ID: ${reportId} has been recommended to recheck by Dr. ${doctorName}.
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};


module.exports = { sendRecheckEmail };
