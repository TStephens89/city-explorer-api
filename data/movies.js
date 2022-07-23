// 'use strict';
// const axios = require('axios').default;

// app.get('/weather', (request, response) => {
//   let searchQuery = request.query.searchQuery;
//   console.log(searchQuery);
//   let movieKey = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchQuery}`;
//   axios.get(weatherKey)
//     .then(res => {
//       console.log(res);
//       let weatherArray = res.data.data.map(day => {
//         return new Forecast(day);
//       });
//       console.log(weatherArray);
//       response.send(weatherArray);
//     })
//     .catch((e) => {
//       console.log(e);
//       response.status(500).send(e);
//     });

















// function movieData(request, response) {
//   console.log(request.query);
//   let movieKey=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchQuery}`
//   axios.get(movieKey)
//     // .query({
//     //   query: request.query.searchQuery,
//     //   api_key: process.env.MOVIE_API_KEY
//     // })
//     .then(movieData => {
//       console.log('in the movies request: ', movieData.body.results);
//       response.send(movieData.body.results.map(movie => new Movie(movie)))
//     })
//     .catch(e => {
//       console.log(e);
//       response.status(500).send(e);
//     });
// }

// class Movies {
//   constructor(movie){
//   this.title = movie.title;
//   this.overview = movie.overview;
//   this.average_votes = movie.vote_average;
//   this.total_votes = movie.vote_count;
//   this.image_url = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
//   this.popularity = movie.popularity;
//   this.released_date = movie.release_date;
// }

// module.exports = Movies;