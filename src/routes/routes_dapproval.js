const express = require('express');
const router = express.Router();
const controller_dapproval = require('../controllers/controller_dapproval.js');
const controller_contact = require('../controllers/controller_contact.js');

router.get('/patientId/:reportId', controller_dapproval.getPatientIdByReportId);
router.post('/recommendations', controller_dapproval.recommendations);
router.post('/contact', controller_contact.contact);

module.exports = router;
