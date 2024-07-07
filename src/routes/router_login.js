//router_login.js
const express = require('express'); //importing express
const router_login = express.Router(); //declearing a router instance 
const multer = require('multer');
const upload = multer();


const { getUser, addUser, updateUser, deleteUser, login, getCurrentUser, authenticateJWT, changePassword, authorizeRoles, sendVerificationCode, verifyCodeAndResetPassword,  notifyAdmins, approveUser, denyUser,  } = require('../controllers/controller_login.js');

//The URL s to connect the Front end. 
router_login.get('/users', getUser);
router_login.post('/createuser', upload.none(), addUser);

router_login.post('/updateuser', updateUser);
router_login.delete('/deleteuser', deleteUser);
router_login.post('/login', login);
router_login.post('/changePassword', authenticateJWT, changePassword);
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

// Route for notifying admins
router_login.post('/notifyadmins', authenticateJWT, authorizeRoles('ADMIN'), async (req, res) => {
  try {
      await notifyAdmins(req.body); // Pass the necessary data to notifyAdmins
      res.json({ success: true, message: 'Admins notified successfully' });
  } catch (error) {
      console.error('Error notifying admins:', error);
      res.status(500).json({ success: false, error: error.message });
  }
});

router_login.get('/approve/:id', approveUser);
router_login.get('/deny/:id', denyUser);

// Logout endpoint
router_login.post('/logout', (req, res) => {
  // Log the request for debugging purposes
  console.log('Logout endpoint called');

  // Invalidate the token (e.g., remove it from a token store)
  const token = req.cookies.token;
  
  // Log the token for debugging purposes
  console.log('Token:', token);

  // Remove the token from your store or mark it as invalid
  // For example:
  // TokenStore.invalidate(token);

  res.clearCookie('token'); // Clear the token cookie
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router_login; 