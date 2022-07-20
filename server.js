'use strict';

require('dotenv').config();
const express = require('express');
// CORS - cross origin resource sharing
// origin - the beginning of your url
const cors = require('cors');
const weatherData = require('./data/weather.json');


// singleton ( there can only be one!! )
const app = express(); // returns an object, with methods designed to handle Requests.
const PORT = process.env.PORT || 3001;

// enable cross origin resource sharing between localhost:3001 and any other url that may make a request.
app.use(cors());

//provide the app object, with verbs and paths
app.get('/weather', (request, response) => {
  let searchQuery = request.query.city;

  console.log('searchQuery', searchQuery);
  const city = weatherData.find(element => element.city_name.toLowerCase() === searchQuery.toLowerCase());
  console.log('TESTING:', city.data);
  // do something
  response.send(city.data); // every callback must send back a response.
});



app.get('/error', (request, response) => {

  throw new Error('Server not happy!!');

});

// error handlers take a special 1st parameter, that will be any error thrown from another route handler
app.use('*', (error, request, response, next) => {
  // console.log(response);
  response.status(500).send(error);
});

// put error handlers down here
app.use('*', (request, response) => {
  console.log('catch all route hit');
  response.status(404).send('Route Not found :(');
});

// opens up the server for requests
app.listen(PORT, () => {
  console.log('Server is running on port :: ' + PORT);
});