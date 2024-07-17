const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = require('../config');
const { recommendations } = require('../controllers/controller_dapproval');

const sendRecheckEmail = async (reportId, doctorName, patientId) => {
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
      to: 'rpks.0102@gmail.com',
      subject: 'Recommend to Recheck',
      text: `Dear Rajith Singh,
    The report with ID: ${reportId} has been recommended to recheck by Dr. ${doctorName}.
    Patient ID :${patientId}
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
