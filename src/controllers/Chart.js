var models = require('../models');
var AccountChart = models.AccountChart;
var Chart = models.Chart;

var addCircle = function(req, res) {
  var chartData = {
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

  var newChart = Chart.ChartModel(chartData);
  newChart.save(function(error) {
    if (error) {
      console.log(error);
      return res.status(400).json({error: "Unable to create chart"});
    } else {
      var linkData = {
        userId: newChart.ownerId,
        chartId: newChart._id
      };

      var newLink = AccountChart.AccountChartModel(linkData);
      newLink.save(function(error) {
        if (error) {
          console.log(error);
          return res.status(400).json({error: "Fail to link account with chart"});
        }
      });
      req.session.account.currentChart = newChart._id;
      res.json({redirect: '/app'});
    }
  });
};

module.exports.addCircle = addCircle;
