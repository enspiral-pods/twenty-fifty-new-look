define(['knockout', 'text!/components/chart-tabs.html', 'dataRequester', 'chartParser', 'pathway', 'bindings/chart'], function(ko, html, DataRequester, ChartParser, Pathway) {
  'use strict';

  var ViewModel = function(params) {
    var self = this;

    // - For chartView components TODO: fix them so they can require? :) --
    self.DataRequester = DataRequester;
    self.ChartParser = ChartParser;
    self.Pathway = Pathway;
    // ---------------

    self.pathway = params.pathway;

    self.CHART_TABS = [
      { "id": 1, "name": "energy", "icon": "energy", "title": "Energy", "viewmodel": "tabbed", "charts": [
          { "id": 1, "name": "EnergyDemandChart", "title": "Demand vs Supply" },
          { "id": 2, "name": "EnergySupplyChart", "title": "Supply vs Demand" }
        ]
      },
      { "id": 2, "name": "electricity", "icon": "electricity", "title": "Electricity", "viewmodel": "tabbed", "charts": [
          { "id": 1, "name": "ElectricityDemandChart", "title": "Demand vs Supply" },
          { "id": 2, "name": "ElectricitySupplyChart", "title": "Supply vs Demand" }
        ]
      },
      { "id": 3, "name": "emissions", "icon": "emissions", "title": "Emissions", "charts": [
          { "id": 1, "name": "EnergyEmissionsChart", "title": "Emissions" }
        ]
      },
      { "id": 4, "name": "flows", "icon": "flows", "title": "Flows", "charts": [
          { "id": 1, "name": "FlowsChart", "title": "Flows" }
        ]
      },
      { "id": 5, "name": "map", "icon": "map", "title": "Map", "charts": [
          { "id": 1, "name": "MapChart", "title": "Map" }
        ]
      },
      { "id": 6, "name": "airQuality", "icon": "air", "title": "Air", "charts": [
          { "id": 1, "name": "AirQualityChart", "title": "Air Quality" }
        ]
      },
      { "id": 7, "name": "energySecurity", "icon": "energy", "title": "Energy Security", "charts": [
          {"id": 1, "name": 'EnergySecurity', "title": 'a chart' }
        ] },
      { "id": 8, "name": "costs", "icon": "costs", "title": "Costs", "charts": [
          { "id": 1, "name": "CostsContextChart", "title": "In Context" },
          { "id": 2, "name": "CostsComparedChart", "title": "Compared" },
          { "id": 3, "name": "CostsSensitivityChart", "title": "Sensitivity" }
        ]
      },
      { "id": 9, "name": "overview", "icon": "overview", "title": "Overview", "charts": [
          { "id": 1, "name": "OverviewChart", "title": "Overview" }
        ]
      }
    ];

    self.currentTabId = ko.observable(8);

    /** Sets visible tab */
    self.setActiveTab = function(chart) {
      self.currentTabId(chart.id);
    };

  };

  return {
    viewModel: ViewModel,
    template: html
  }

});

