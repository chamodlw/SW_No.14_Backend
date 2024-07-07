
const express = require('express');
const router = express.Router();
const UpdateTest = require('../controllers/controller_updateresult');

router.post('/updatdata', UpdateTest);
module.exports = router;
  