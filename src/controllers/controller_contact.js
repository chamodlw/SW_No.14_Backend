const Contact = require('../models/model_contact');


// Function to handle saving recommendations
const contact = (req, res) => {
    const {  name,email,no,message } = req.body;
    const newContact = new Contact({
       
        name:name,
        email:email,
        contact_No:no,
        message:message,
    });

    newContact.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};
module.exports = {contact };
