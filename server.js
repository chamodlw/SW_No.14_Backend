const express = require('express');
const app = express();
const cors = require('cors');
const port = 3100;
const host = '127.0.0.1';
const mongoose = require('mongoose');
const routerappmng = require('./src/routes/router-appmng');
const routertmng = require('./src/routes/router-tmng');
const router = require('./src/routes/router');
const router_dapproval = require('./src/routes/routes_dapproval');
const router_login = require('./src/routes/router_login');


//middleware
app.use(cors()); //cors is a middleware - to avoid the block between frontend and backend
app.use(express.json()); //convert into json arrays what we share as request response bodies
//use this urlencode to encode what comes from the backend - encode arrays and strings, use extend? - can encode anything

//mongoose.connect('mongodb://localhost:27017/employee'); adding connection of the mongo db



app.use(cors());
app.use(express.json());

const uri ='mongodb+srv://wlakshan888:ByteBuzzers14@cluster0.efzfkee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connect = async () =>{ 
    try{
        await mongoose.connect(uri); 
        console.log('Connected to mongodb');
    }
    catch(error){
        console.log('MongoDB Error: ', error);
    }
}; 

connect();

const server = app.listen(port,host, () => { //port and host were added to variables in the top
    console.log(`Node Server listen to ${server.address().port}`); //this console log is to confirm that the server is running
});

app.use('/api',router);
app.use('/api',router_dapproval);
app.use('/api',routerappmng);
app.use('/api',routertmng);

app.use('/api/router_login',router_login);
