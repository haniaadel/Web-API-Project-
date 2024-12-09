// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 8000;

const server = app.listen(port, listening);

function listening() {
    console.log(`server is running on localhost ${port}`)
};

// GET route
app.get('/all', returnData);

function returnData (request, response){
    response.send(projectData);
};

// POST route
app.post('/add', callBack);

function callBack (request, response){
    let data = request.body;
    let newData = {
        temperature: data.temperature,
        date: data.date,
        input: data.input
    }
    console.log(data);
    projectData = newData;
    console.log(projectData);
}; 
