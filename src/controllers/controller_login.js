//controller_login.js
const nodemailer = require('nodemailer');
const User = require('../models/model_login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'healthlab00@gmail.com',
      pass: 'ydrk ixyq govu occn',
  },
});

// Helper function to calculate age
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};


const addUser = async (req, res) => {
  console.log('Request body:', req.body);

  if (!req.body || !req.body.firstname || !req.body.lastname || !req.body.email || !req.body.address || !req.body.gender || !req.body.dob || !req.body.phonenumber || !req.body.role || !req.body.username || !req.body.password) {
    console.log('Missing required fields');
    return res.status(400).json({ success: false, message: 'Missing required fields in request body' });
  }

  const { firstname, lastname, email, address, gender, dob, nationalID, phonenumber, role, username, password } = req.body;

  const age = calculateAge(dob);

  // Check if nationalID is required for users above 16 years old
  if (age >= 16 && !nationalID) {
    console.log('National ID is required for users above 16 years old');
    return res.status(400).json({ success: false, message: 'National ID is required for users above 16 years old' });
  }

  try {
    // Store empty string if nationalID is not provided or is null
    const nationalIDToStore = nationalID || '';
    console.log('National ID to store:', nationalIDToStore);

    // Check for existing user with the same username or nationalID (if not empty string)
    let existingUser = null;
    if (nationalIDToStore !== '') {
      existingUser = await User.findOne({
        $or: [
          { nationalID: nationalIDToStore },
          { username: username }
        ]
      });
    } else {
      existingUser = await User.findOne({ username: username });
    }

    console.log('Existing user:', existingUser);

    if (existingUser) {
      let duplicateField;
      if (existingUser.nationalID && existingUser.nationalID === nationalIDToStore) {
        duplicateField = 'National ID';
      } else if (existingUser.username === username) {
        duplicateField = 'Username';
      }

      const errorMessage = `Error registering user: This ${duplicateField.toLowerCase()} already exists.`;
      console.log(errorMessage);
      return res.status(409).json({ success: false, field: duplicateField, message: errorMessage });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    // Create new user instance
    const newUser = new User({
      firstname,
      lastname,
      email,
      address,
      gender,
      dob,
      nationalID: nationalIDToStore,
      phonenumber,
      role,
      username,
      password: hashedPassword,
      status: role === 'PATIENT' ? 'approved' : 'pending', // Automatically approve PATIENT role
    });

    console.log('New user object:', newUser);

    // Save the user to the database
    await newUser.save();
    console.log('User saved successfully');

    // Notify admins for roles other than PATIENT
    if (role !== 'PATIENT') {
      await notifyAdmins(newUser);
      console.log('Admins notified');
    }

    res.status(201).json({ success: true, message: 'Registration successful', user: newUser });

  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


const getUser = (req, res, next) => {
    User.find()
        .then(response => res.json({ response }))
        .catch(error => res.status(500).json({ error }));
};  


const updateUser = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { _id, firstname, lastname, email, address, nationalID, phonenumber, username, profilePic } = req.body;

    if (!_id) {
      console.log('User ID is missing');
      return res.status(400).json({ message: 'User ID is missing' });
    }

    const updateFields = {};
    if (firstname) updateFields.firstname = firstname;
    if (lastname) updateFields.lastname = lastname;
    if (email) updateFields.email = email;
    if (address) updateFields.address = address;
    if (nationalID) updateFields.nationalID = nationalID;
    if (phonenumber) updateFields.phonenumber = phonenumber;
    if (username) updateFields.username = username;
    if (profilePic) updateFields.profilePic = profilePic;
    console.log('Update fields:', updateFields);

    const updatedUser = await User.findByIdAndUpdate(_id, updateFields, { new: true });

    if (!updatedUser) {
      console.log('User not found or could not be updated');
      return res.status(404).json({ message: 'User not found or could not be updated' });
    }

    console.log('User updated successfully:', updatedUser);

    res.json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const deleteUser = (req, res, next) => {
    const { id } = req.body;
    User.deleteOne({ _id: id })
        .then(response => res.json({ response }))
        .catch(error => res.status(500).json({ error }));
};

const login = async (req, res, next) => {
  console.log('login - Request body:', req.body);
    try {
        const { username, password } = req.body;
        const user = await User.authenticate(username, password);

        if (user) {
            if (user.role !== 'PATIENT' && user.status !== 'approved') {
              console.log('login - Account pending approval or denied for user:', username);
                return res.status(403).json({ error: 'Your account is pending approval or has been denied' });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    name: `${user.firstname} ${user.lastname}`
                },
                'jwt_secret',
                { expiresIn: '1d' }
            );

            console.log('login - JWT token generated:', token);
            res.cookie('token', token, { httpOnly: true });
            res.json({ message: "Success", data: token });
        } else {
            res.status(401).json({ message: "Invalid username or password." });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: "Internal server error." });
    }
};

const changePassword = async (req, res) => {
  console.log('changePassword - Request body:', req.body);
  const { currentPassword, newPassword, username } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      console.log('User not found for the given username:', username);
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      console.log('changePassword - Current password is incorrect');
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    console.log('changePassword - Password changed successfully for user:', username);
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error changing password:', error);
    let errorMessage = 'Server error';
    if (error.code === 11000) {
      errorMessage = 'Duplicate key error, username already exists';
    } else if (error.name === 'ValidationError') {
      errorMessage = error.message;
    }
    res.status(500).json({ message: errorMessage });
  }
};


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

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  // The middleware extracts the token from either the token cookie or the Authorization header (Bearer <token> format).
    console.log('authenticateJWT - Token:', token); // Log the token

    if (!token) {
        req.user = null; // Ensure req.user is null if no token is found
        return next();   // Continue to the next middleware or route handler
    }

    jwt.verify(token, 'jwt_secret', (err, decoded) => {
      if (err) {
          console.error('authenticateJWT - Error verifying token:', err);
          req.user = null;
          return next();
      }
      req.user = decoded;
      console.log('authenticateJWT - Decoded user:', decoded);
      next();
  });
};


// Middleware to authorize based on roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
          console.log('Access denied for role:', req.user.role);
          return res.status(403).json({ message: 'Access denied.' });
      }
      console.log('Access granted for role:', req.user.role);
      next();
  };
};

// Function to generate a 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
};

const sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  console.log('Sending verification code to:', email);

  try {
      const user = await User.findOne({ email });
      if (!user) {
          console.log('User not found for email:', email);
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      const verificationCode = generateVerificationCode();
      user.verificationCode = verificationCode;
      user.verificationCodeExpires = Date.now() + 3600000; // 1 hour
      await user.save();
      console.log('Verification code saved for user:', email);

      // Set up nodemailer transporter
      const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'healthlab00@gmail.com',
              pass: 'ydrk ixyq govu occn'
          }
      });

      const mailOptions = {
          to: email,
          subject: 'Password Reset Verification Code',
          text: `Your verification code is: ${verificationCode}`
      };

      await transporter.sendMail(mailOptions);
      console.log('Verification code email sent to:', email);

      res.json({ success: true, message: 'Verification code sent' });
  } catch (error) {
      console.error('Error sending verification code:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};


const verifyCodeAndResetPassword = async (req, res) => {
  const { username, code, newPassword } = req.body;
  console.log('Received request to reset password for username:', username);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found for username:', username);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.verificationCode !== code || Date.now() > user.verificationCodeExpires) {
      console.log('Invalid or expired verification code for username:', username);
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();
    console.log('Password reset successfully for username:', username);

    // Send password reset confirmation email
    await sendPasswordResetEmail(user.email);

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ success: false, message: 'Failed to reset password' });
  }
};


const sendPasswordResetEmail = (email) => {
  console.log('Preparing to send password reset email to:', email);

  const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'healthlab00@gmail.com',
          pass: 'ydrk ixyq govu occn',
      },
  });

  const mailOptions = {
      from: 'healthlab00@gmail.com',
      to: email,
      subject: 'Password Reset Successfully',
      text: 'Your password has been reset successfully.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending password reset email:', error);
      } else {
          console.log('Password reset email sent:', info.response);
      }
  });
};

const notifyAdmins = async (newUser) => {
  console.log('Starting to notify admins about new user signup');
  
  try {
      const admins = await User.find({ role: 'ADMIN' });
      console.log('Admin users found:', admins);

      const approveLink = `https://helthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/router_login/approve/${newUser._id}`;
      const denyLink = `https://helthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/router_login/deny/${newUser._id}`;

      const emailContent = `
        <p>A new ${newUser.role} has signed up:</p>
        <p>Username: ${newUser.username}</p>
        <p>Email: ${newUser.email}</p>
        <p>
          <a href="${approveLink}">Approve</a>
          <a href="${denyLink}">Deny</a>
        </p>
      `;

      for (const admin of admins) {
          console.log('Sending email to admin:', admin.email);
          const mailOptions = {
              from: 'healthlab00@gmail.com',
              to: admin.email,
              subject: 'New User Signup Approval',
              html: emailContent,
          };
          await transporter.sendMail(mailOptions);
          console.log('Email sent to admin:', admin.email);
      }

      // Send email to healthlab00@gmail.com
      console.log('Sending email to healthlab00@gmail.com');
      const mailOptions = {
          from: 'healthlab00@gmail.com',
          to: 'healthlab00@gmail.com',
          subject: 'New User Signup Approval',
          html: emailContent,
      };
      await transporter.sendMail(mailOptions);
      console.log('Email sent to healthlab00@gmail.com');
  } catch (error) {
      console.error('Error in notifyAdmins function:', error);
  }
};

const approveUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const approvedUser = await User.findByIdAndUpdate(userId, { status: 'approved' });

    if (!approvedUser) {
      return res.status(404).send('User not found.');
    }

    const { firstname, lastname, email } = approvedUser;

    // Send approval email
    const mailOptions = {
      from: 'healthlab00@gmail.com',
      to: email,
      subject: 'Your Request to Join Health Lab was Accepted',
      html: `
        <p>Dear ${firstname} ${lastname},</p>
        <p>Congratulations! Your request to join Health Lab has been accepted.</p>
        <p>Best regards,<br/>Health Lab Team</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.send('User approved and email sent to the requested User successfully');

  } catch (error) {
    console.error(`Error approving user`, error);
    res.status(500).send('Error approving user.');
  }
};

const denyUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deniedUser = await User.findByIdAndUpdate(userId, { status: 'denied' });

    if (!deniedUser) {
      return res.status(404).send('User not found.');
    }

    const { firstname, lastname, email } = deniedUser;

    // Send denial email
    const mailOptions = {
      from: 'healthlab00@gmail.com',
      to: email,
      subject: 'Your Request to Join Health Lab was Denied',
      html: `
        <p>Dear ${firstname} ${lastname},</p>
        <p>We regret to inform you that your request to join Health Lab has been denied.</p>
        <p>Best regards,<br/>Health Lab Team</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.send('User denied and email sent to the requested User successfully');

  } catch (error) {
    console.error(`Error denying user.`, error);
    res.status(500).send('Error denying user.');
  }
};



//Here I have used authenticateJWT middleware before authorizeRoles middleware. Middleware order matters because authenticateJWT should verify the token first before authorizeRoles checks the role.
//Exporting function
module.exports = { addUser, getUser, updateUser, deleteUser, login, changePassword, getCurrentUser, authenticateJWT, authorizeRoles, sendVerificationCode, verifyCodeAndResetPassword, notifyAdmins, approveUser, denyUser, sendPasswordResetEmail };
