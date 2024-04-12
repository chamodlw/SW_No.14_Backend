//router3.js
//this file is made to access each method in app.js file
const express = require('express');
const router3 = express.Router();
//const controller = require('../controllers/controller3.js');
//const { routes } = require('../app.js'); // since in controller3, I exported signin and login separately, here also I imported them seperatelty 

const { signin, login } = require('../controllers/controller3.js'); // Import signin and login separately
const { getUser, updateUser, deleteUser } = require('../controllers/controller3.js');


router3.get('/users',getUser);
router3.post('/createuser',signin);
router3.put('/updateuser',updateUser);
router3.delete('/deleteuser',deleteUser);
router3.post('/login', login);

module.exports = router3;