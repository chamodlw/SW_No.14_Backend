//server.js
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3100;
const host = 'localhost';
const mongoose = require('mongoose');
const router = require('./src/routes/router1')
const UserModel = require('./models/users')

app.use(cors());
app.use(express.json());

//mongoose.connect('mongodb://localhost:27017/employee');
const uri ='mongodb+srv://wlakshan888:ByteBuzzers14@cluster0.efzfkee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connect = async () =>{
    try{
        await mongoose.connect(uri);
        console.log('connect to mongodb');
    }
    catch(error){
        console.log('mongodb eror' + error);
    }
};

connect();

app.post('/register', (req, res) => {
    const{fullname, email, address, id, username, password, confirmpassword} = req.body;
    bcrypt.hash(password, 10) //bcrypt function is to change the normal password into hashing. 10 means, this would create 10 unique characters everytime we enter the password.
    .then(hash => {
        UserModel.create({fullname, email, address, id, username, password, confirmpassword:hash})
        .then(user => res.json({status: "OK"}))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
})
const server = app.listen(port,host, () => {
    console.log(`node server listen to ${server.address().port}`);
});

app.use('/api',router);
