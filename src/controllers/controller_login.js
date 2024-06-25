//controller_login.js
const nodemailer = require('nodemailer');
const User = require('../models/model_login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer'); //a middleware
const upload = multer(); // Use multer's memory storage engine or configure as needed. Configure multer
const path = require('path');

const addUser = (req, res, next) => {
    const { firstname, lastname, email, address, phonenumber, nationalID, role, username, password } = req.body;
 // Check if a user with the given nationalID or email or username already exists
    User.findOne({ $or: [{ nationalID: nationalID }, { email: email }, { username: username }] })
        .then(existingUser => {
            if (existingUser) {
                // Determine which field caused the duplicate
                let duplicateField;
                if (existingUser.nationalID === nationalID) {
                    duplicateField = 'National ID';
                } else if (existingUser.email === email) {
                    duplicateField = 'Email';
                } else {
                    duplicateField = 'Username';
                }
                const errorMessage = `Error registering user: This ${duplicateField.toLowerCase()} already exists.`;
                return res.status(409).json({ success: false,  field: duplicateField, message: errorMessage });
            }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            //console.error('Error hashing password:', err);
            return res.status(500).json({ success: false, error: err.message });
        }

        //console.log('Password hashed successfully:', hashedPassword);

        const user = new User({ firstname, lastname, email, address, phonenumber, nationalID, role, username, password: hashedPassword });
        //console.log('Saving new user:', user);
        user.save()
            .then(user => {
                console.log('User saved successfully');
                //console.log('User saved successfully:', user); // consol.log user data also
                res.json({ success: true, message: "Registration successful", user })
    })

            .catch(error => {
                console.error('Error saving user:', error);
                res.status(500).json({ success: false, error: error.message })
    });
    });
})
.catch(error => {
    console.error('Error checking existing user:', error);
    res.status(500).json({ success: false, error: error.message });
});
};

const getUser = (req, res, next) => {
    User.find()
        .then(response => res.json({ response }))
        .catch(error => res.status(500).json({ error }));
};


const updateUser = (req, res, next) => {
  // Log the incoming request body
  console.log('Request body:', req.body);

  // Destructure the specific fields from the request body
  const { id, _id, firstname, lastname, email, address, nationalID, phonenumber, username, profilePic, profilePicUrl } = req.body;

  // Set the userId variable to either id or _id, whichever is present.
  const userId = id || _id;

  // Check if userId is present
  if (!userId) {
    console.log('User ID is missing', req.body);
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  // Construct the update object based on the provided fields
  const updateObject = { firstname, lastname, email, address, nationalID, phonenumber, username };

  // Log the update object to ensure it has the correct data
  console.log('Update object:', updateObject);

  // Handle file upload with Multer
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer error occurred
      console.error('Multer error:', err);
      return res.status(500).json({ success: false, error: err.message });
    } else if (err) {
      // Any other error occurred
      console.error('Error uploading file:', err);
      return res.status(500).json({ success: false, error: err.message });
    }

    // Add profilePic and profilePicUrl if req.file exists
    if (req.file) {
      updateObject.profilePic = req.file.path; // Update path based on your Multer configuration
      updateObject.profilePicUrl = req.file.filename; // Update as needed
    }

    // Log the update object to ensure it has the correct data
    console.log('Update object:', updateObject);

    // Create a query object to match either _id or id
    const query = {
      $or: [
        { _id: userId },
        { id: userId }
      ]
    };

    // Update the user record in the database
    User.updateOne(query, { $set: updateObject })
      .then(response => {
        // Log the response from the database
        console.log('Update response:', response);

        if (response.nModified === 0) {
          // If no documents were modified, the user might not have been found
          console.log('No documents were modified');
          return res.status(404).json({ success: false, message: "User not found or no changes made" });
        }

        res.json({ success: true, message: "Profile updated successfully", response });
      })
      .catch(error => {
        // Log any errors that occur during the update process
        console.error('Error updating profile:', error);
        res.status(500).json({ success: false, error: error.message });
      });
  });
};

const deleteUser = (req, res, next) => {
    const { id } = req.body;
    User.deleteOne({ _id: id })
        .then(response => res.json({ response }))
        .catch(error => res.status(500).json({ error }));
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        //console.log('Received username:', username);
        //console.log('Received password:', password); //- error handling
        const user = await User.authenticate(username, password);
        console.log('User:', user); //Log User Details

        if (user) {
            const token = jwt.sign({id: user._id, username: user.username, role: user.role, name: `${user.firstname} ${user.lastname}` }, 'jwt_secret',{ expiresIn: '1d' });
            //console.log('Generated token:', token); // Log the generated token

            res.cookie('token', token, { httpOnly: true });
            //console.log('Sending user data:', { username: user.username, role: user.role }); // Log the user data being sent in the response
            res.json({ message: "Success", data:token } ); // Include the user's role in the response, so it will directed to corresposnding role page. Include id, so it will directed to their specific account
        } else {
            console.log('Authentication failed for:', username);
            res.status(401).json({ message: "Invalid username or password." });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: "Internal server error." });
    }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!req.user || !req.user.id) {
    console.log('changePassword - User ID not found in request');
    return res.status(400).json({ message: 'User ID not found in request' });
  }

  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found:', user);
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const getCurrentUser = (req, res, next) => { //For User Profile
    //console.log('getCurrentUser - req.user:', req.user); // Log the req.user object, After successfull User Profile display, this log would be 

    if (!req.user || !req.user.id) {
        console.log('getCurrentUser - User ID not found in request');
        return res.status(400).json({ message: 'User ID not found in request' });
    }

    const userId = req.user.id; // Extracted from the JWT token by the authenticateJWT middleware
    User.findById(userId)
    //User.findById(req.user.id)
        .then(user => {
            if (!user) {
                console.log('User not found:', user);
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: error.message });
        });
};


// Middleware to authenticate JWT tokens 
const authenticateJWT = (req, res, next) => {
    //const token = req.cookies.token;
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  // The middleware extracts the token from either the token cookie or the Authorization header (Bearer <token> format).
    console.log('authenticateJWT - Token:', token); // Log the token

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' }); //If no token is found.
    }
    try {
        const decoded = jwt.verify(token, 'jwt_secret'); //if the token is available, then verify it.
        console.log('authenticateJWT - Decoded:', decoded); // Log the decoded token
        req.user = decoded; //middleware sets req.user to the decoded JWT payload, which typically includes id, username, and role.
        next();
    } catch (ex) {
        console.error('authenticateJWT - Error:', ex);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Middleware to authorize based on roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied.' });
        }
        next();
    };
};

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'theodahettiarachchi00@gmail.com',
      pass: 'jmfb ptue esqm vtzr'
    }
  });
  
  // Function to generate a 6-digit verification code
  const generateVerificationCode = () => {
    return crypto.randomBytes(3).toString('hex');
  };
  
  // Send verification code to user's email
  const sendVerificationCode = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const verificationCode = generateVerificationCode();
      user.verificationCode = verificationCode;
      user.verificationCodeExpires = Date.now() + 3600000; // 1 hour
      await user.save();
  
      const mailOptions = {
        to: email,
        subject: 'Password Reset Verification Code',
        text: `Your verification code is: ${verificationCode}`
      };
  
      await transporter.sendMail(mailOptions);
  
      res.json({ success: true, message: 'Verification code sent' });
    } catch (error) {
      console.error('Error sending verification code:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  
  // Verify the code and reset the password
  const verifyCodeAndResetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user || user.verificationCode !== code || user.verificationCodeExpires < Date.now()) {
        return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
      }
  
      user.password = newPassword; // Hash the password before saving
      user.verificationCode = undefined;
      user.verificationCodeExpires = undefined;
      await user.save();
  
      res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

//Here I have used authenticateJWT middleware before authorizeRoles middleware. Middleware order matters because authenticateJWT should verify the token first before authorizeRoles checks the role.
//Exporting function
module.exports = { addUser, getUser, updateUser, deleteUser, login, changePassword, getCurrentUser, authenticateJWT, authorizeRoles, sendVerificationCode, verifyCodeAndResetPassword };
