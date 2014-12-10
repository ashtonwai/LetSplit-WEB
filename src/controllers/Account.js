var models = require('../models');
var Account = models.Account;

// include chart to create new chart
//var Chart = require('./Chart.js');

var loginPage = function(req, res) {
  res.render('login');
};

var signupPage = function(req, res) {
  res.render('signup');
};

var logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};

var login = function(req, res) {
  var user = req.body.user;
  var pass = req.body.pass;

  Account.AccountModel.authenticate(user, pass, function(err, account) {
    if (err || !account) {
      if (err)
        console.log(err);
      return res.status(401).json({error: "Wrong username or password"});
    } else {
      req.session.account = account.toAPI();
      res.json({redirect: '/home'});
    }
  });
};

var signup = function(req, res) {
  Account.AccountModel.generateHash(req.body.password, function(salt, hash) {
    var accountData = {
      firstname: req.body.first,
      lastname: req.body.last,
      email: req.body.email,
      salt: salt,
      username: req.body.username,
      password: hash
    };

    var newAccount = new Account.AccountModel(accountData);
    newAccount.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(400).json({error: "Username or email already exist"});
      } else {
        req.session.account = newAccount.toAPI();
        //create new chart
        //Chart.addChart(req, res);
        res.json({redirect: '/home'});
      }
    });
  });
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signupPage = signupPage;
module.exports.signup = signup;
