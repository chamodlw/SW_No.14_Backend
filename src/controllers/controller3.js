// controller3.js - Theoda - use for login
const User = require('../models/model3'); // Importing User model
const bcrypt = require('bcrypt');

const signin = (req, res, next) => {
    // Signin function implementation
    const { fullname, email, address, nationalID, username, password } = req.body;
    const user = new User({ fullname, email, address, nationalID, username, password });
    user.save()
        .then(user => {
            res.json({ success: true, message: "Registration successful", user });
        })
        .catch(error => {
            res.status(500).json({ success: false, error: error.message });
        });
};

const getUser = (req, res, next) => {
    // getUser function implementation
    User.find()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

const updateUser = (req, res, next) => {
    // updateUser function implementation
    const { fullname, email, address, nationalID, username, password } = req.body;
    const userId = req.user.id;
    const updateObject = {};
    if (fullname) {
        updateObject.fullname = fullname;
    }
    if (email) {
        updateObject.email = email;
    }
    if (address) {
        updateObject.address = address;
    }
    if (nationalID) {
        updateObject.nationalID = nationalID;
    }
    if (username) {
        updateObject.username = username;
    }
    if (password) {
        updateObject.password = password;
    }
    User.updateOne({ _id: userId }, { $set: updateObject })
        .then(response => { 
            res.json({ success: true, message: "Profile updated successfully", response });
        })
        .catch(error => {
            res.status(500).json({ success: false, error: error.message });
        });
};

const deleteUser = (req, res, next) => {
    // deleteUser function implementation
    const { id } = req.body;
    User.deleteOne({_id:id})
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

const login = (req, res, next) => {
    // login function implementation
    const { username, password } = req.body;

    model3.authenticate(username, password)
        .then(user => {
            if (user) {
                res.json({ success: true, message: "Login successful", user: user });
            } else {
                res.status(401).json({ success: false, message: "Invalid username or password" });
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

// Exporting functions
module.exports = { signin, login, getUser, updateUser, deleteUser };