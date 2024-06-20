//protected.js - define a set of routes that are protected by authentication and authorization middleware
const express = require('express');
const { authenticateJWT, authorizeRoles } = require('../controllers/controller_login');
const router = express.Router();

router.get('/Admin', authenticateJWT, authorizeRoles('PATIENT', 'DOCTOR', 'ADMIN', 'LABASSISTANT', 'LABOPERATOR'), (req, res) => {
    res.send('Admin content');
});

router.get('/Doctor', authenticateJWT, authorizeRoles('DOCTOR'), (req, res) => {
    res.send('Doctor content');
});

router.get('/Patient', authenticateJWT, authorizeRoles('PATIENT'), (req, res) => {
    res.send('Patient content');
});

router.get('/LabAssistant', authenticateJWT, authorizeRoles('LABASSISTANT'), (req, res) => {
    res.send('LabAssistant content');
});

router.get('/LabOperator', authenticateJWT, authorizeRoles('LABOPERATOR'), (req, res) => {
    res.send('LabOperator content');
});

module.exports = router;
