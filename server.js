//server.js - to run the backend - express - a javascript framework we use. We can make an http server using express and make rest API s 
const express = require('express');
const app = express(); //created and express instance
const cors = require('cors'); //installing cors - after typing npm i cors in terminal
const port = 3100;
const host = '127.0.0.1';
const mongoose = require('mongoose');
const router1 = require('./src/routes/router1');
const router3 = require('./src/routes/router3');
const router = require('./src/routes/router');



//middleware
app.use(cors()); //cors is a middleware - to avoid the block between frontend and backend
app.use(express.json()); //convert into json arrays what we share as request response bodies
app.use(express.urlencoded({
    extended:true,
})
); //use this urlencode to encode what comes from the backend - encode arrays and strings, use extend? - can encode anything

//mongoose.connect('mongodb://localhost:27017/employee'); adding connection of the mongo db
const uri ='mongodb+srv://wlakshan888:ByteBuzzers14@cluster0.efzfkee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connect = async () =>{ //javascript async function connect function is to connect uri with mongodb
    try{
        await mongoose.connect(uri); //connecting to our uri/uniform resource indicator through mongodb using mongoose library
        console.log('Connected to mongodb');
    }
    catch(error){
        console.log('MongoDB Error: ', error);
    }
}; //try catch to error handle

connect(); //calling the connect function
//when the server file runs, the connect function will run, will access uri through mongoos drive inside try block, will access the uri - the link

const server = app.listen(port,host, () => { //port and host were added to variables in the top
    console.log(`Node Server listen to ${server.address().port}`); //this console log is to confirm that the server is running
});

app.use('/api/router1',router1);
app.use('/api/router3',router3);
app.use('/api/', router);
module.exports = app;

//npm i nodemon -g to install nodemon
//nodemon server.js to check nodemon
//postmon is used to try API s. 
