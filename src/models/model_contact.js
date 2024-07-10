const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: String,
  email: String,
  phone_number: String,
  date: Date,
  feedback: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
