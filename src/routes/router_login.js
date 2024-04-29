//router_login.js
//this file is made to access each method in app.js file
const express = require('express'); //importing express
const router_login = express.Router(); //declearing a router instance 

const { signin, login } = require('../controllers/controller_login.js'); 
const { getUser, updateUser, deleteUser } = require('../controllers/controller_login.js');


router_login.get('/users',getUser);
router_login.post('/createuser',signin);
router_login.put('/updateuser',updateUser);
router_login.delete('/deleteuser',deleteUser);
router_login.post('/login', login);

module.exports = router_login; 