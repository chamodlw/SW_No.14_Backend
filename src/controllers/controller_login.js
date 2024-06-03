const User = require('../models/model_login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addUser = (req, res, next) => {
    const { firstname, lastname, email, address, phonenumber, nationalID, role, username, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }

        const user = new User({ firstname, lastname, email, address, phonenumber, nationalID, role, username, password: hashedPassword });

        user.save()
            .then(user => res.json({ success: true, message: "Registration successful", user }))
            .catch(error => res.status(500).json({ success: false, error: error.message }));
    });
};

const getUser = (req, res, next) => {
    User.find()
        .then(response => res.json({ response }))
        .catch(error => res.status(500).json({ error }));
};

const updateUser = (req, res, next) => {
    const { id, firstname, lastname, email, address, phonenumber, nationalID, role, username, password } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "User ID is required" });

    const updateObject = { firstname, lastname, email, address, phonenumber, nationalID, role, username, password };
    if (password) {
        updateObject.password = bcrypt.hashSync(password, 10);
    }

    User.updateOne({ _id: id }, { $set: updateObject })
        .then(response => res.json({ success: true, message: "Profile updated successfully", response }))
        .catch(error => res.status(500).json({ success: false, error: error.message }));
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
        //console.log('Received password:', password); - error handling
        const user = await User.authenticate(username, password);
        //console.log('User:', user); //Log User Details

        if (user) {
            const token = jwt.sign({id: user._id, username: user.username, role: user.role }, 'jwt_secret',{ expiresIn: '1d' });
            //console.log('Generated token:', token); // Log the generated token

            res.cookie('token', token, { httpOnly: true });
            //console.log('Sending user data:', { username: user.username, role: user.role }); // Log the user data being sent in the response
            res.json({ message: "Success", user: { id: user._id, username: user.username, role: user.role } }); // Include the user's role in the response, so it will directed to corresposnding role page. Include id, so it will directed to their specific account
        } else {
            console.log('Authentication failed for:', username);
            res.status(401).json({ message: "Invalid username or password." });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Middleware to authenticate JWT tokens 
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, 'jwt_secret'); //if the token is available, then verify it.
        req.user = decoded;
        next();
    } catch (ex) {
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

module.exports = { addUser, getUser, updateUser, deleteUser, login, authenticateJWT, authorizeRoles };
