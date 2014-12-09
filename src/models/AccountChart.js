var mongoose = require('mongoose');
var account = require('./AccountChart.js');
var chart = require('./Chart.js');

var AccountChartModel;

var AccountChartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: 'Account'
  },

  chartId: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: 'Chart'
  }
});

AccountChartModel = mongoose.model('AccountChart', AccountChartSchema);

module.exports.AccountChartModel = AccountChartModel;
module.exports.AccountChartSchema = AccountChartSchema;
