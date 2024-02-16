//server.js
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3100;
const host = 'localhost';
const mongoose = require('mongoose');
const router = require('./src/routes/router1')

app.use(cors());
app.use(express.json());

const uri ='mongodb+srv://wlakshan888:ByteBuzzers14@cluster0.efzfkee.mongodb.net/?retryWrites=true&w=majority';
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

const server = app.listen(port,host, () => {
    console.log(`node server listen to ${server.address().port}`);
});

app.use('/api',router);
