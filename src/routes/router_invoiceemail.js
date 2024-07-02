// routes/emailRoutes.js
const express = require('express');
const routerinvoice = express.Router();
const { sendEmail } = require('../controllers/controller_invoicemail');

routerinvoice.post('/send', sendEmail);

module.exports = routerinvoice;
