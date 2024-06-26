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
    //console.log('Request body:', req.body); //To see what data/updations is being sent to the server.

    const { id, _id, firstname, lastname, email, address, phonenumber, nationalID, role, username, password } = req.body; //Destructuring the specific fields from the request body
    //if (!id){
    const userId = id || _id; //Set the userId variable to either id or _id, whichever is present.
    if (!userId) {  // if userId is not present.
        console.log('User ID is missing');
        return res.status(400).json({ success: false, message: "User ID is required" });
    }
    const updateObject = { firstname, lastname, email, address, phonenumber, nationalID, role, username };
    if (password) {
        updateObject.password = bcrypt.hashSync(password, 10);
    }

    //console.log('Update object:', updateObject);

    User.updateOne({ _id: userId  }, { $set: updateObject })
        .then(response => {
            //console.log('Update response:', response);
            res.json({ success: true, message: "Profile updated successfully", response });
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            res.status(500).json({ success: false, error: error.message });
        });};

const deleteUser = (req, res, next) => {
    const { id } = req.body;
    User.deleteOne({ _id: id })
        .then(response => res.json({ response }))
        .catch(error => res.status(500).json({ error }));
};

const login = async (req, res, next) => {
    try {
        console.log("enter");
        const { username, password } = req.body;
        //console.log('Received username:', username);
        //console.log('Received password:', password); - error handling
        const user = await User.authenticate(username, password);
        //console.log('User:', user); //Log User Details

        if (user) {
            const token = jwt.sign({id: user._id, username: user.username, role: user.role , name:  `${user.firstname} ${user.lastname}`}, 'jwt_secret',{ expiresIn: '1d' });
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
    const token = req.cookies.token;
    //console.log('authenticateJWT - Token:', token); // Log the token
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, 'jwt_secret'); //if the token is available, then verify it.
        //console.log('authenticateJWT - Decoded:', decoded); // Log the decoded token
        req.user = decoded;
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

module.exports = { addUser, getUser, updateUser, deleteUser, login, getCurrentUser, authenticateJWT, authorizeRoles };
