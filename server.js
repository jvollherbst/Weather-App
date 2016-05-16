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
var session       = require('express-session');
var pg            = require('pg');
var pgSession = require('connect-pg-simple')(session);
var connectionString = process.env.DATABASE_URL;
const api_key     = process.env.API_KEY;

app.use(session({
  store: new pgSession({
    pg : pg,
    conString : connectionString,
    tableName : 'session'
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public/')));

app.set('views', './views')
app.set('view engine', 'ejs')


app.get('/weather/:address', (req, res) => {

  request(
    { url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.address + 'key=' + process.env.GEOKEY,
  json: true },
    function(err, apires, body) {

      let query = [body.results[0].geometry.location.lat, body.results[0].geometry.location.lng];

      request({ url: api_key + query, json: true },
        function(err, apires, apibody) {
          res.send(apibody)
        })
    })
});


app.get('/', (req, res) => {
  res.render('index', {
    user: req.session.user
  })
});

app.use('/users', require(path.join(__dirname, '/routes/users')));

const port   = process.env.PORT || 3000;
const server = app.listen(port, function( ){});
