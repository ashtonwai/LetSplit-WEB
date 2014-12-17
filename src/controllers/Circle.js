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
        label: "",
        userId: null
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
          console.log(newCircle);
          //req.session.account.circle = newCircle._id;
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
  Circle.CircleModel.findById(req.session.account.circle, function(err, doc) {
    if (err || !doc) {
      console.log(err);
      return res.status(400).json({error: "No circles found"});
    } else {
      for (var i=0; i<doc.data.length; i++) {
        if (doc.data[i].userId == null)
          doc.data.splice(this);
        else if (doc.data[i].userId == req.session.account._id) {
          doc.data[i].value = Number(doc.data[i].value) + Number(req.body.addNum);
          return Circle.CircleModel.update({_id: req.session.account.circle}, {$set: {data: doc.data}}, function(err, data) {
            if (err)
              console.log(err);
            else {
              console.log(doc.data);
              res.json({redirect: '/app'});
            }
          });
        }
      }
      var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
      doc.data.push(
        {
          value: Number(req.body.addNum),
          color: color,
          highlight: "#7E7E7E",
          label: req.session.account.username,
          userId: req.session.account._id
        }
      );
      return Circle.CircleModel.update({_id: req.session.account.circle}, {$set: {data: doc.data}}, function(err, data) {
        if (err)
          conosole.log(err);
        else {
          console.log(doc.data);
          res.json({redirect: '/app'});
        }
      });
    }
  });
};

var sub = function(req, res) {
  Circle.CircleModel.findById(req.session.account.circle, function(err, doc) {
    if (err || !doc) {
      console.log(err);
      return res.status(400).json({error: "No circle found"});
    } else {
      for (var i=0; i<doc.data.length; i++) {
        if (doc.data[i].userId == req.session.account._id) {
          if ((Number(doc.data[i].value) - Number(req.body.subNum)) > 0) {
            doc.data[i].value = Number(doc.data[i].value) - Number(req.body.subNum);
            return Circle.CircleModel.update({_id: req.session.account.circle}, {$set: {data: doc.data}}, function(err, data) {
              if (err)
                console.log(err);
              else {
                console.log(doc.data);
                res.json({redirect: '/app'});
              }
            });
          } else if ((Number(doc.data[i].value) - Number(req.body.subNum)) == 0){
            doc.data[i].value = 0;
            return Circle.CircleModel.update({_id: req.session.account.circle}, {$set: {data: doc.data}}, function(err, data) {
              if (err)
                console.log(err);
              else {
                console.log(doc.data);
                res.json({redirect: '/app'});
              }
            });
          } else {
            console.log("Cannot subtract");
          }
        }
      }
      return function() {
        console.log("no user data found");
      }
    }
  });
};

module.exports.addCircle = addCircle;
module.exports.findCircle = findCircle;
module.exports.add = add;
module.exports.sub = sub;
