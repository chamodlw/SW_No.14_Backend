// model3.js - Login model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({ //creating a model for user.
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    nationalID: {
        type: String,
        required: true, 
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['doctor', 'patient', 'admin', 'lab assistant', 'lab operator'],
        required: true
    }
});

// Hash the password before saving to the database
userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Method to authenticate user
userSchema.statics.authenticate = function(username, password) {
    return new Promise((resolve, reject) => {
        this.findOne({ username: username }, (err, user) => {
            if (err) return reject(err);
            if (!user) return resolve(null);

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) return reject(err);
                if (result === true) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            });
        });
    });
};

const user = mongoose.model('User', userSchema); //Assigning userSchema to a model names User . When we get another field other than String for password and user name, this model will validate it and stop it. 

module.exports = user; //export user model as a module