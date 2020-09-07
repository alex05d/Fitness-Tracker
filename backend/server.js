// these are the required dependencies for the application
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//dot evn file to secure keys
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// this is the middleware for the appilication 
app.use(cors());
app.use(express.json());

// connection to MONGO atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//connection to the routes  
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// this starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});