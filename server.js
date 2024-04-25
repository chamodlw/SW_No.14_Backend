 
const express = require('express');
const app = express(); 
const cors = require('cors'); 
const port = 3100;
const host = '127.0.0.1';
const mongoose = require('mongoose');
const routerappmng = require('./src/routes/router-appmng');
const routertmng = require('./src/routes/router-tmng');
const router3 = require('./src/routes/router3');
const router = require('./src/routes/router');




app.use(cors()); //to avoid the block between frontend and backend
app.use(express.json()); //convert into json arrays what we share as request response bodies


const uri ='mongodb+srv://wlakshan888:ByteBuzzers14@cluster0.efzfkee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connect = async () =>{ //javascript async function connect function is to connect uri with mongodb
    try{
        await mongoose.connect(uri); //connecting to our uri/uniform resource indicator through mongodb using mongoose library
        console.log('Connected to mongodb');
    }
    catch(error){
        console.log('MongoDB Error: ', error);
    }
}; 

connect(); //calling the connect function
//when the server file runs, the connect function will run, will access uri through mongoos drive inside try block, will access the uri - the link

const server = app.listen(port,host, () => { //port and host were added to variables in the top
    console.log(`Node Server listen to ${server.address().port}`); //this console log is to confirm that the server is running
});

app.use('/api/',routerappmng);
app.use('/api/',routertmng);
app.use('/api/router3',router3);
app.use('/api', router);
module.exports = app;

 