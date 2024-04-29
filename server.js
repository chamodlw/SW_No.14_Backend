const express = require('express');
const app = express();
const cors = require('cors');
const port = 3100;
const host = '127.0.0.1';
const mongoose = require('mongoose');
const router1 = require('./src/routes/router1');
const router3 = require('./src/routes/router_login');
const router_login = require('./src/routes/router_login');


//middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
})
);

//mongoose.connect('mongodb://localhost:27017/employee'); adding connection of the mongo db
const uri ='mongodb+srv://wlakshan888:ByteBuzzers14@cluster0.efzfkee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connect = async () =>{ 
    try{
        await mongoose.connect(uri); 
        console.log('Connected to mongodb');
    }
    catch(error){
        console.log('Mongodb eror' + error);
    }
}; 

connect();

const server = app.listen(port,host, () => { 
    console.log(`node server listen to ${server.address().port}`);
});

app.use('/api/router1',router1); 
app.use('/api/router_login',router_login);
module.exports = app;
