
const express = require('express');
const router = express.Router();
const UpdateTest = require('../controllers/controller_updateresult');

router.put('/updatdata', UpdateTest);
module.exports = router;
  