const pg               = require('pg');
const bcrypt           = require('bcrypt');
const salt             = bcrypt.genSaltSync(10);
const session          = require('express-session');
const connectionString = process.env.DATABASE_URL;

function loginUser(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done()
      console.log(err)
      return res.status(500).json({success: false, data: err})
    }

    var query = client.query("SELECT * FROM users WHERE email LIKE ($1);", [email], function(err, results) {
      done()
      if (err) {
        return console.error('error running query', err)
      }

      if (results.rows.length === 0) {
        res.status(204).json({success: false, data: 'no account matches that password'})
      } else if (bcrypt.compareSync(password, results.rows[0].password_digest)) {
        res.rows = results.rows[0]
        next()
      }
    })
  })
}

function createSecure(email, password, callback) {

  bcrypt.genSalt(function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      callback(email, hash)
    })
  })
}

function createUser(req, res, next) {
  createSecure(req.body.email, req.body.password, saveUser);

  function saveUser(email, hash) {
    pg.connect(connectionString, function(err, client, done) {
      if (err) {
        done()
        console.log(err)
        return res.status(500).json({success: false, data: err})
      }

      var query = client.query("INSERT INTO users ( email, password_digest) VALUES ($1, $2);", [email, hash], function(err, result) {
        done()
        if (err) {
          return console.error('error running query', err)
        }
        next()
      })
    })
  }
}

function showSearches(req, res, next) {

  pg.connect(connectionString, function(err, client, done) {

    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query(`SELECT * FROM searches WHERE user_id = $1`,
    [req.session.user.users_id],
    function(err, result) {
      done()
      if(err) {
        return console.error('error, running query', err);
      }
      res.rows = result.rows;
      next()
    });
  });
}

function addSearches(req, res, next) {

  pg.connect(connectionString, function(err, client, done) {

    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    var query = client.query(`INSERT INTO searches (location, latitude, longitude, user_id) VALUES($1, $2, $3, $4)`,
    [req.body.location, req.body.latitude, req.body.longitude, req.session.user.users_id],
    function(err, result) {
      done()
      if(err) {
        return console.error('error, running query', err);
      }
      next()
    });
  });
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.showSearches = showSearches;
module.exports.addSearches = addSearches;
