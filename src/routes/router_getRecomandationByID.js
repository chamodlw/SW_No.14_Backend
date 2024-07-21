const express = require('express');
const router = express.Router();
const controller_getRecomandationByID = require('../controllers/controller_GetRecomendationByID');


router.get('/getrecomandationbyid/:id', controller_getRecomandationByID.getRecommendationByID);

module.exports = router;
