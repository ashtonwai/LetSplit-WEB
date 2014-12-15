var mongoose = require('mongoose');

var CircleModel;

var CircleSchema = new mongoose.Schema({
  name: {
    type: String
  },

  description: {
    type: String
  },

  data: {
    type: Array,
    require: true
  },

  ownerId: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: 'Account'
  },

  createdDate: {
    type: Date,
    default: Date.now
  }
});

CircleSchema.statics.findById = function(circleId, callback) {
  var search = {
    _id: circleId
  };

  CircleModel.findOne(search, callback);
};

CircleModel = mongoose.model('Circle', CircleSchema);

module.exports.CircleModel = CircleModel;
module.exports.CircleSchema = CircleSchema;
