const Contact = require('../models/model_contact');

const contact = (req, res) => {
  const { name, email, contact_No, message, date } = req.body;
  const newContact = new Contact({
    name: name,
    email: email,
    contact_No: contact_No,
    date: date,
    feedback: message,
  });

  newContact.save()
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = { contact };
