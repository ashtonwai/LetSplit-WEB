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

CircleSchema.statics.findById = function(id, callback) {
  var search = {
    _id: id
  };
  return CircleModel.findOne(search, callback);
};

CircleModel = mongoose.model('Circle', CircleSchema);

module.exports.CircleModel = CircleModel;
module.exports.CircleSchema = CircleSchema;
