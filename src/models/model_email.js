const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { EMAIL_USER, EMAIL_PASS } = require('../config');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Handlebars configuration
const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: path.resolve('./src/controllers/Reporthtml'), // Path to Handlebars partials
    defaultLayout: false,
  },
  viewPath: path.resolve('./src/controllers/Reporthtml'), // Path to Handlebars templates
  extName: '.handlebars',
};

// Use Handlebars with Nodemailer
transporter.use('compile', hbs(handlebarOptions));

// Function to send approval email with report details
const sendApprovalEmail = async (patientEmail, data, logMessage) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: patientEmail,
    subject: 'Report Approved',
    template: 'report', // Assuming you have a 'report.handlebars' template
    context: {
      data,
      logMessage, // Include log message in the email template context
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

module.exports = { sendApprovalEmail };
