var controllers = require('./controllers');

var router = function(app) {
  app.get('/login', controllers.Account.loginPage);
  app.post('/login', controllers.Account.login);
  app.get('/signup', controllers.Account.signupPage);
  app.post('/signup', controllers.Account.signup);
  app.get('/logout', controllers.Account.logout);
  app.get('/home', controllers.Home.homePage);
  app.post('/addCircle', controllers.Chart.addCircle);
  app.get('/', controllers.Account.loginPage);
};

module.exports = router;
