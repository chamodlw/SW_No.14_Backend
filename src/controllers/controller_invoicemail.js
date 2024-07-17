
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');


const sendEmail = async (req, res) => {
  const { data, type } = req.body;

  // Validate if data.email exists and is not empty
  if (!data || !data.patientEmail) {
    console.log('Error: No recipient email provided');
    return res.status(400).send('Error: No recipient email provided');
  }

  console.log('Data received:', data);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'healthlab00@gmail.com',
      pass: 'ydrk ixyq govu occn', // Replace with your actual password
    },
  });

  let handlebarOptions;

  if (type === 'invoice') {
    handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./src/controllers/views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./src/controllers/views'),
      extName: '.handlebars',
    };
  } else {
    handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./src/controllers/Reporthtml'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./src/controllers/Reporthtml'),
      extName: '.handlebars',
    };
  }

  transporter.use('compile', hbs(handlebarOptions));

  console.log('Sending email to:', data.patientEmail);
  const mailOptions = {
    from: 'rajithaubandara@gmail.com',
    to: data.patientEmail,
    subject: 'Healthlab Inc.',
    template: 'email', // Make sure you have an 'email.handlebars' template in your views folder
    context: {
      data,
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
};

module.exports = { sendEmail };
