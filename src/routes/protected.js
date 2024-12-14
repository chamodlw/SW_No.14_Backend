//protected.js - define a set of routes that are protected by authentication and authorization middleware
const express = require('express');
const { authenticateJWT, authorizeRoles } = require('../controllers/controller_login');
const router = express.Router();

router.get('/Admin', authenticateJWT, authorizeRoles('ADMIN'), (req, res) => {
    res.send('Admin content');
});

router.get('/Doctor', authenticateJWT, authorizeRoles('DOCTOR', 'ADMIN'), (req, res) => {
    res.send('Doctor content');
});

router.get('/Patient', authenticateJWT, authorizeRoles('PATIENT', 'DOCTOR', 'ADMIN'), (req, res) => {
    res.send('Patient content');
});

module.exports = router;
