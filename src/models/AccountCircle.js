var mongoose = require('mongoose');

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

AccountCircleModel = mongoose.model('AccountCircle', AccountCircleSchema);

module.exports.AccountCircleModel = AccountCircleModel;
module.exports.AccountCircleSchema = AccountCircleSchema;
