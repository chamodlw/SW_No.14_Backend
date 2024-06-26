//router1.js
const express = require('express');
const router = express.Router();
const controller =require('../controllers/controller-tmng.js');

router.get('/tests',controller.getTests);
router.get('/selecttest',controller.selectTest);
router.post('/addtest',controller.addTest);
router.post('/updatetest',controller.updateTest);
router.post('/deletetest',controller.deleteTest);

module.exports = router;

//