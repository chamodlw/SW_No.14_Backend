//router2.js
const express = require('express');
const router = express.Router();
const controller2 = require('../controllers/controller2.js');

router.post('/addappointments', controller2.addAppointments);

module.exports = router;
