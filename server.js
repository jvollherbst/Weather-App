'use strict'

require('dotenv').config();
var express         = require('express');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var path            = require('path');
var request         = require('request');
var db              = require('./db/pg');
var moment          = require('moment');
var app             = express();
var session         = require('express-session');
var pg              = require('pg');
var pgSession = require('connect-pg-simple')(session);
var connectionString = process.env.DATABASE_URL;
var api_key          = process.env.API_KEY;

if (process.env.NODE_ENV === 'production') {
      connectionString = process.env.DATABASE_URL;
    }

app.use(session({
  store: new pgSession({
    pg : pg,
    varring : connectionString,
    tableName : 'session'
  }),
  secret: 's',
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
    { url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.address,
  json: true },
    function(err, apires, body) {
      console.log(body);
      let query = [body.results[0].geometry.location.lat, body.results[0].geometry.location.lng];
      console.log(query);
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

app.get('/searches', (req, res) => {
  if(req.session.user){
    res.render('searches/index', {
      user: req.session.user
    })
  }
  else {
    res.redirect('/');
  }
})

app.get('/', (req, res) => {
  res.render('index', {
    user: req.session.user
  })

});


app.use('/users', require(path.join(__dirname, '/routes/users')));

var port   = process.env.PORT || 3000;
app.listen(port);
