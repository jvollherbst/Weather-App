'use strict'

require('dotenv').config();
const express     = require('express');
const logger      = require('morgan');
const bodyParser  = require('body-parser');
const methodOverride    = require('method-override');
const path        = require('path');
const request     = require('request');
const db          = require('./db/pg');
const moment      = require('moment');
const app         = express();
const session       = require('express-session');
const pg            = require('pg');
const pgSession = require('connect-pg-simple')(session);
const connectionString = process.env.DATABASE_URL;
const api_key     = process.env.API_KEY;

if (process.env.NODE_ENV === 'production') {
      connectionString = process.env.DATABASE_URL;
    }

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

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public/')));

app.set('views', './views')
app.set('view engine', 'ejs')


app.get('/weather/:address', (req, res) => {

  request(
    { url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.address + process.env.GEOKEY,
  json: true },
    function(err, apires, body) {

      let query = [body.results[0].geometry.location.lat, body.results[0].geometry.location.lng];

      request({ url: api_key + query, json: true },
        function(err, apires, apibody) {
          res.send(apibody)
        })
    })
});

app.get('/searches/all', db.showSearches, (req, res) => {
  res.send(res.rows)
})

app.post('/searches', db.addSearches, (req, res) => {})

app.get('/', (req, res) => {
  res.render('index', {
    user: req.session.user
  })

});

app.use('/users', require(path.join(__dirname, '/routes/users')));

const port   = process.env.PORT || 3000;
const server = app.listen(port, function( ){});
