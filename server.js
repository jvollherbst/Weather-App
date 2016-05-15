'use strict'

require('dotenv').config();
const express     = require('express');
const logger      = require('morgan');
const bodyParser  = require('body-parser');
const path        = require('path');
const request     = require('request');
const db          = require('./db/pg');
const moment      = require('moment');
const app         = express();
const api_key     = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public/')));

app.set('views', './views')
app.set('view engine', 'ejs')

// { url: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
// qs: {
// p: req.params.address,
// key: process.env.GEOKEY
// }
app.get('/weather/:address', (req, res) => {
  console.log(req.params.address);
  request(
    { url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.address + 'key=' + process.env.GEOKEY,
  json: true },
    function(err, apires, body) {
      console.log('server', body);
      let query = [body.results[0].geometry.location.lat, body.results[0].geometry.location.lng];

      request({ url: api_key + query, json: true },
        function(err, apires, apibody) {
          // res.render('weather',
          // {
          //   timezone: apibody.timezone,
          //   humidity: apibody.currently.humidity,
          //   windSpeed: apibody.currently.windSpeed
          // })
          // console.log(apibody);
          res.send(apibody)
        })
    })
});

// app.get('/weather', (req, res) => {
//   request({ url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.query.address + 'key=' + process.env.GEOKEY,
//   json: true },
//     function(err, apires, body) {
//       console.log('server', body);
//       let query = [body.results[0].geometry.location.lat, body.results[0].geometry.location.lng];
//
//       request({ url: api_key + query, json: true },
//         function(err, apires, apibody) {
//           // res.render('weather',
//           // {
//           //   timezone: apibody.timezone,
//           //   humidity: apibody.currently.humidity,
//           //   windSpeed: apibody.currently.windSpeed
//           // })
//           // console.log(apibody);
//           res.send(apibody)
//         })
//     })
// });


app.get('/', (req, res) => {
  res.render('index')
});

// app.use('/users', require(path.join(__dirname, '/routes/users')));
// app.use('/', require(path.join(__dirname, '/routes/')));

const port   = process.env.PORT || 3000;
const server = app.listen(port, function( ){});
