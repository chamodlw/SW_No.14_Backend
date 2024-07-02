
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const sendEmail = async (req, res) => {
  const {invoiceDetails,total } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rajithaubandara@gmail.com',
      pass: 'psws brgl lizk otke',
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: path.resolve('./src/controllers/views'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./src/controllers/views'),
    extName: '.handlebars',
  };

  transporter.use('compile', hbs(handlebarOptions));

  const mailOptions = {
    from: 'rajithaubandara@gmail.com',
    to: 'kgrubandara@gmail.com',
    subject: 'Sending Email using Node.js',
    template: 'email',
    context: {
        invoiceDetails,total,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
};

module.exports = { sendEmail };
