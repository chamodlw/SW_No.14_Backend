//router_login.js
const express = require('express'); //importing express
const router_login = express.Router(); //declearing a router instance 
const multer = require('multer');
const upload = multer();


const { getUser, addUser, updateUser, deleteUser, login, changePassword, getCurrentUser, authenticateJWT, authorizeRoles, sendVerificationCode, verifyCodeAndResetPassword  } = require('../controllers/controller_login.js');

//The URL s to connect the Front end. 
router_login.get('/users', getUser);
router_login.post('/createuser', addUser);
router_login.post('/updateuser',  upload.none(), updateUser);
router_login.delete('/deleteuser', deleteUser);
router_login.post('/login', login);
router_login.post('/changepassword', authenticateJWT, changePassword);
router_login.get('/getCurrentUser', authenticateJWT, getCurrentUser); //For UserProfile page - Middleware should be applied before the controller function
//This endpoint /getCurrentUser in router_login.js is protected with the authenticateJWT middleware.
//or else router_login.post('/login', async... can implement the full login route here. (which is in controller_login)

// Endpoint to check if the user is authenticated as admin
router_login.get('/checkAdminAuth', authenticateJWT, authorizeRoles('ADMIN'), (req, res) => {
    res.json({ status: 'success', message: 'User authenticated as admin' });
  });
  //authorizeRoles('ADMIN') ensures that only users with the role ADMIN can access this endpoint.

router_login.post('/send-verification-code', sendVerificationCode);
router_login.post('/verify-code-and-reset-password', verifyCodeAndResetPassword);


module.exports = router_login; 