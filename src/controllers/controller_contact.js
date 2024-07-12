const Contact = require('../models/model_contact');

const contact = (req, res) => {
  const { name, email, phone_number, feedback, date } = req.body;
  const newContact = new Contact({
    name: name,
    email: email,
    phone_number: phone_number,
    date: date,
    feedback: feedback,
  });

  newContact.save()
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};
const getContacts = (req,res) =>{
  Contact.find()
      .then(response =>{
          res.json({response})
      })
      .catch(error =>{
          res.json({error})
      })
};

exports.getContacts = getContacts;
exports.contact = contact;
