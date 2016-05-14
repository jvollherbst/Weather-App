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
// moment().format();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public/')));

app.set('views', './views')
app.set('view engine', 'ejs')


// app.get('/weather', (req, res) => {
//   var query = req.query.location;
//   request({ url: api_key + query, json: true },
//     function(err, apires, body) {
//       res.send(body)
//     })
// });

app.get('/geo', (req, res) => {
  request({ url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.query.address + 'key=' + process.env.GEOKEY,
  json: true },
    function(err, apires, body) {
      var query = [body.results[0].geometry.location.lat, body.results[0].geometry.location.lng];
      request({ url: api_key + query, json: true },
        function(err, apires, body) {
          res.send(body)
        })

      // res.send(body)
      // console.log(body.results[0].geometry.location.lat);
    })
});


app.get('/', (req, res) => {
  res.render('index')
});

// app.use('/users', require(path.join(__dirname, '/routes/users')));
// app.use('/', require(path.join(__dirname, '/routes/')));

const port   = process.env.PORT || 3000;
const server = app.listen(port, function( ){});
