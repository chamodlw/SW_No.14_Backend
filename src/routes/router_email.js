// routes/emailRoutes.js
const express = require('express');
const { approveReport } = require('../controllers/controller_email');
const router = express.Router();

router.post('/approve', approveReport);

module.exports = router;
