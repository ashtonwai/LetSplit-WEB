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
          req.session.account.select = newCircle._id;
          res.json({redirect: '/app'});
        }
      });
    }
  });
};

var getAllCircles = function(req, res) {
  AccountCircle.AccountCircleModel.getAllCircles(req.session.account._id, function(error, circles) {
    if (error) {
      console.log(error);
    } else {
      var circleList = [];
      for (var obj in circles) {
        Circle.CircleModel.findById(circles[obj].circleId, function(error, doc) {
          circleList.push(doc);
        });
      }
      return circleList;
    }
  });
};

module.exports.addCircle = addCircle;
module.exports.getAllCircles = getAllCircles;
