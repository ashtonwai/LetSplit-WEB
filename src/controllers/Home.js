var homePage = function(req, res) {
  res.render('home', {username: req.session.account.username});
};

module.exports.homePage = homePage;
