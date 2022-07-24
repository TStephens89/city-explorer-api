const axios = require('axios').default;
const key = process.env.WEATHER_API_KEY;
// const express = require('express');
// const app = express();

class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = obj.weather.description;
  }
}
function weatherInfo(request, response) {
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
}

module.exports = weatherInfo;
