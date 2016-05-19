'use strict'
var express     = require('express');
var users = express.Router();
var db    = require('./../db/pg');

users.route('/')
  .post(db.createUser, (req, res) => {
    res.redirect('/');
  })

users.get('/new', (req, res) => {
  res.render('users/new.ejs', { user: req.session.user });
})

users.get('/login', (req, res) => {
  res.render('users/login.ejs', { user: req.session.user });
})

users.post('/login', db.loginUser, (req, res) => {
  req.session.user = res.rows;

  req.session.save(function() {
    res.redirect('/');
  });
})

users.delete('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  })
})



module.exports = users;
