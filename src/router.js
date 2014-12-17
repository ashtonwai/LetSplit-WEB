var controllers = require('./controllers');

var router = function(app) {
  app.get('/login', controllers.Account.loginPage);
  app.post('/login', controllers.Account.login);
  app.get('/signup', controllers.Account.signupPage);
  app.post('/signup', controllers.Account.signup);
  app.get('/logout', controllers.Account.logout);
  app.get('/', controllers.Account.loginPage);

  app.get('/home', controllers.Page.homePage);
  app.get('/app', controllers.Page.appPage);

  app.post('/addCircle', controllers.Circle.addCircle);
  app.post('/findCircle', controllers.Circle.findCircle);
  app.post('/add', controllers.Circle.add);
  app.post('/sub', controllers.Circle.sub);
};

module.exports = router;
