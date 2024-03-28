const express = require('express');
const router = express.Router();
const controller3 = require('../controllers/controller3.js');

router.post('/recommendations', controller3.recommendations);

module.exports = router;
