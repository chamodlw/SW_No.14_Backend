//router2.js
const express = require('express');
const router = express.Router();
const controllerappmng = require('../controllers/controller-appmng.js');

router.post('/addappointments', controllerappmng.addAppointments);

module.exports = router;
