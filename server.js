'use strict';


require('dotenv').config();
const axios = require('axios');
const express = require('express');
// CORS - cross origin resource sharing
// origin - the beginning of your url
const cors = require('cors');
// const movieData = require('./data/movies');
const PORT = process.env.PORT || 3001;
const key = process.env.WEATHER_API_KEY;
// const weatherData = require('./data/weather.json');

// singleton ( there can only be one!! )
const app = express(); // returns an object, with methods designed to handle Requests.
app.use(cors()); // set up cross origin resource sharing
// enable cross origin resource sharing between localhost:3001 and any other url that may make a request.
// app.use(cors());

class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = obj.weather.description;
  }
}
async function handleMovies(request, response) {

  console.log(request);
  let movieKey = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=seattle`;
  await axios.get(movieKey)
    .then(res => {
      console.log(res.data.results);
      response.send(res.data.results);
    })
    .catch((e) => {
      console.log(e);
      response.status(500).send(e);
    });
}
app.get('/movies', handleMovies);
app.get('/weather', (request, response) => {
  let searchQuery = request.query.searchQuery;
  console.log(searchQuery);
  let weatherKey = `https://api.weatherbit.io/v2.0/forecast/daily?key=${key}&city=${searchQuery}&days=5`;
  axios.get(weatherKey)
    .then(res => {
      console.log(res);
      let weatherArray = res.data.data.map(day => {
        return new Forecast(day);
      });
      console.log(weatherArray);
      response.send(weatherArray);
    })
    .catch((e) => {
      console.log(e);
      response.status(500).send(e);
    });


  // create a weather route
  // app.get('/weather', (request, response) => {
  //   console.log(request.query);
  //   let { lat, lon, searchQuery } = request.query;

  //   if (!lat || !lon || !searchQuery) {
  //     throw new Error('Please send lat lon and search query as a query string');
  //   }

  // find appropriate value from weatherData
  // use search Query to find an object within weather data
  // let city = weatherData.find(city => {
  //   return city.city_name.toLowerCase() === searchQuery.toLowerCase();
  // });

  // if (city) {
  //   // create forecast objects for each forcast in city.data
  //   let forecastArray = city.data.map(forecast => new Forecast(forecast));
  //   response.send(forecastArray);
  // } else {
  //   response.status(404).send('City not found');
  // }
});

// error handling??
app.use('*', (error, request, response, next) => {
  // next is a function that moves the request to the next middleware
  response.status(500).send(error);
});

app.use('*', (request, response) => {
  response.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log('Server is running on port : ' + PORT);
});

























//provide the app object, with verbs and paths
// app.get('/weather', (request, response) => {
//   let searchQuery = request.query.city;

//   console.log('searchQuery', searchQuery);
//   const city = weatherData.find(element => element.city_name.toLowerCase() === searchQuery.toLowerCase());
//   console.log('TESTING:', city.data);
//   // do something
//   response.send(city.data); // every callback must send back a response.
// });



// app.get('/error', (request, response) => {

//   throw new Error('Server not happy!!');

// });

// // error handlers take a special 1st parameter, that will be any error thrown from another route handler
// app.use('*', (error, request, response, next) => {
//   // console.log(response);
//   response.status(500).send(error);
// });

// // put error handlers down here
// app.use('*', (request, response) => {
//   console.log('catch all route hit');
//   response.status(404).send('Route Not found :(');
// });

// // opens up the server for requests
// app.listen(PORT, () => {
//   console.log('Server is running on port :: ' + PORT);
// eslint-disable-next-line eol-last
// });