const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = require('../config');
const Contact = require('../models/model_contact');

const sendContactEmail = async (contactDetails) => {
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
      to: 'healthlab00@gmail.com',
      subject: 'Feedback from a user',
      text: `Name: ${contactDetails.name}\nEmail: ${contactDetails.email}\nPhone Number: ${contactDetails.phone_number}\nDate: ${contactDetails.date}\nFeedback: ${contactDetails.feedback}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw new Error('Error sending contact email');
  }
};

const contact = async (req, res) => {
  const { name, email, phone_number, feedback, date } = req.body;
  const newContact = new Contact({
    name,
    email,
    phone_number,
    date,
    feedback,
  });

  try {
    const savedContact = await newContact.save();
    await sendContactEmail(savedContact);
    res.status(200).json({ message: 'Contact saved and email sent successfully', contact: savedContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContacts = (req, res) => {
  Contact.find()
    .then(response => {
      res.status(200).json({ response });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = { contact, getContacts };
