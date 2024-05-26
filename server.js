// Server dependencies
const express = require('express');
const cors = require('cors');
const app = express();
// Mongo dependency

const mongoose = require('mongoose');

// DB Connection
const connectDatabase = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect('mongodb+srv://rajithaubandara:%40Uom2022@pationdata.dwwjafy.mongodb.net/?retryWrites=true&w=majority&appName=Pationdata')
        .then((data) => {
            console.log(`mongodb connected with server ${data.connection.host}`);
        })
        .catch((err) => {
            console.log(err);
        })
}

// server
const port = 3100;

app.use(cors());
app.use(express.json());
app.use(require("./src/routes/record"));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Call the connectDatabase function and pass the startServer function as a callback
connectDatabase((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        // Database connection successful, start the server
        startServer();
    }
});