var models = require('../models');
var AccountCircle = models.AccountCircle;
var Circle = models.Circle;

var addCircle = function(req, res) {
  var circleData = {
    name: req.body.chartName,
    description: req.body.chartDescript,
    data: [{
        value: 1,
        color:"#D3D3D3",
        highlight: "#7E7E7E",
        label: "none"
    }],
    ownerId: req.session.account._id
  };

  var newCircle = Circle.CircleModel(circleData);
  newCircle.save(function(error) {
    if (error) {
      console.log(error);
      return res.status(400).json({error: "Unable to create new circle"});
    } else {
      var linkData = {
        userId: newCircle.ownerId,
        circleId: newCircle._id
      };

      var newLink = AccountCircle.AccountCircleModel(linkData);
      newLink.save(function(error) {
        if (error) {
          console.log(error);
          return res.status(400).json({error: "Fail to link account with circle"});
        } else {
          console.log("circle created");
          res.json({redirect: '/app'});
        }
      });
    }
  });
};

var findCircle = function(req, res) {
  Circle.CircleModel.findById(req.session.account.circle, function(error, doc) {
    if (error || !doc) {
      console.log(error);
      return res.status(400).json({error: "No circles found"});
    } else {
      res.json({circleData: doc.data});
    }
  });
};

var add = function(req, res) {
  console.log(req.body.addNum);
};

var sub = function(req, res) {
  console.log(req.body.subNum);
};

module.exports.addCircle = addCircle;
module.exports.findCircle = findCircle;
module.exports.add = add;
module.exports.sub = sub;
