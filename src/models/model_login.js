const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    nationalID: { type: String, required: true, unique: true },
    phonenumber: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['DOCTOR', 'PATIENT', 'ADMIN','LABOPERATOR', 'LABASSISTANT'], required: true }
});

userSchema.statics.authenticate = async function(username, password) {
    try {
        const user = await this.findOne({ username: username }).exec();
        if (!user) {
            console.log('No user found');
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); //To check with the password we have in the DB
        if (!isPasswordValid) {
            console.log('Invalid password');
            return null;
        }

        return user;
    } catch (err) {
        throw err;
    }
};

module.exports = mongoose.model('User', userSchema);
 