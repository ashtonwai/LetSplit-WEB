var mongoose = require('mongoose');

var ChartModel;

var ChartSchema = new mongoose.Schema({
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

ChartModel = mongoose.model('Chart', ChartSchema);

module.exports.ChartModel = ChartModel;
module.exports.ChartSchema = ChartSchema;
