<<<<<<< Updated upstream
//server.js
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3100;
const host = 'localhost';
const mongoose = require('mongoose');
const router = require('./src/routes/router1')
=======
const express = require('express');
const cors = require('cors');
const app = require('./src/app');


const mongoose = require('mongoose');
const router = require('./src/router')

>>>>>>> Stashed changes

app.use(cors());
app.use(express.json());

<<<<<<< Updated upstream
const uri ='mongodb+srv://wlakshan888:ByteBuzzers14@cluster0.efzfkee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connect = async () =>{
    try{
        await mongoose.connect(uri);
        console.log('connect to mongodb');
    }
    catch(error){
        console.log('mongodb eror' + error);
=======

const uri = 'mongodb+srv://wlakshan888:ByteBuzzers14@cluster0.efzfkee.mongodb.net/?retryWrites=true&w=majority'

const connect =async()=>{
    try {
        await mongoose.connect(uri);
        console.log('Connnected to mongodb');

    }
    catch(error){
        console.log('MongoDB Error; ',error);
>>>>>>> Stashed changes
    }
};

connect();
<<<<<<< Updated upstream

const server = app.listen(port,host, () => {
    console.log(`node server listen to ${server.address().port}`);
});

app.use('/api',router);
=======
//3100
const server =app.listen(3001,'127.0.0.1',()=>{

    console.log(`node server is listning to ${server.address().port} `)
});

app.use('/api',router);
>>>>>>> Stashed changes
