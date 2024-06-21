const express = require('express');
const router = express.Router();
const controller_dapproval = require('../controllers/controller_dapproval.js');

router.get('/patientId/:reportId', controller_dapproval.getPatientIdByReportId);
router.post('/recommendations', controller_dapproval.recommendations);


module.exports = router;
