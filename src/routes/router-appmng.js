//router2.js
const express = require('express');
const router = express.Router();
const controllerappmng = require('../controllers/controller-appmng.js');

router.get('/appointments',controllerappmng.getAppointments);
router.post('/addappointment', controllerappmng.addAppointment);
router.get('/appoinments/:appointmentID',controllerappmng.getAppointmentsByID);
router.post('/updateappointment', controllerappmng.updateAppointment);
router.get('/appointmentIds', controllerappmng.getAppointmentIds);
module.exports = router;
