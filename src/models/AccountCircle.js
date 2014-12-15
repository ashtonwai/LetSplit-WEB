var mongoose = require('mongoose');
var account = require('./AccountCircle.js');
var circle = require('./Circle.js');

var AccountCircleModel;

var AccountCircleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: 'Account'
  },

  circleId: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: 'Circle'
  }
});

AccountCircleSchema.statics.getAllCircles = function(id, callback) {
  var search = {
    userId: id
  };
  return AccountCircleModel.find(search, callback);
};

AccountCircleModel = mongoose.model('AccountCircle', AccountCircleSchema);

module.exports.AccountCircleModel = AccountCircleModel;
module.exports.AccountCircleSchema = AccountCircleSchema;
