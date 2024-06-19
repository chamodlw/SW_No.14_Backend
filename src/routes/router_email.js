const express = require('express');
const router = express.Router();
const { approveRecommendation } = require('../controllers/controller_email');
const { authenticateJWT, authorizeRoles } = require('../controllers/controller_email');

// Approve recommendation route
router.get('/recommendations/:id/approve', authenticateJWT, authorizeRoles('admin', 'doctor'), approveRecommendation);

module.exports = router;
