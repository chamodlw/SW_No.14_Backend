//router_login.js
const express = require('express'); //importing express
const router_login = express.Router(); //declearing a router instance 

const { getUser, addUser, updateUser, deleteUser, login} = require('../controllers/controller_login.js');


router_login.get('/users',getUser);
router_login.post('/createuser',addUser);
router_login.post('/updateuser',updateUser);
router_login.delete('/deleteuser',deleteUser);
router_login.post('/login', login);
//router_login.get('/authjwt', authenticateJWT);
//router_login.get('/authroles', authorizeRoles);
//or else router_login.post('/login', async... can implement the full login route here. (which is in controller_login)

module.exports = router_login; 