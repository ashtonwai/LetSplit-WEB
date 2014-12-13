var homePage = function(req, res) {
  res.render('home', {username: req.session.account.username});
};

var appPage = function(req, res) {
  res.render('app',
    {
      username: req.session.account.username,
      currentChart: req.session.account.currentChart
    });
};

module.exports.homePage = homePage;
module.exports.appPage = appPage;
