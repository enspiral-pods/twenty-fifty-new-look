define(['knockout', 'd3', 'charts/chart'], function(ko, d3, Chart) {
  'use strict';

  var CostsSensitivityComponentsChart = function() {};

  CostsSensitivityComponentsChart.prototype = new Chart({});

  CostsSensitivityComponentsChart.prototype.constructor = CostsSensitivityComponentsChart

  CostsSensitivityComponentsChart.prototype.draw = function(dataObjects, width, height){
    var self = this;
    var dataNested = [];
    var data = [];

    if(typeof dataObjects.comparison()["CostsSensitivityComponentsChart"] === "undefined") {
      return 1;
    }

    // Combine arrays into nested
    var current = dataObjects.current()["CostsSensitivityComponentsChart"];
    var comparison = dataObjects.comparison()["CostsSensitivityComponentsChart"];
    for (var i = 0; i < dataObjects.current()["CostsSensitivityComponentsChart"].length; i++) {
      var component = {
        id: i,
        current: current[i],
        comparison: comparison[i]
      }
      dataNested.push(component)
      data.push(component)
    }


    // Sort nested arrays
    dataNested.sort(function(a, b) {
      return ((a.current.value.point > b.current.value.point) ? 1 : -1);
    });
    var componentOrder = [];

    // Order mapping array
    for (var i = 0; i < dataNested.length; i++) {
      componentOrder[dataNested[i].id] = i;
    }

    self.outerWidth = width || self.outerWidth;
    self.outerHeight = height ||self.outerHeight;

    self.width = self.outerWidth - self.margin.left - self.margin.right;
    self.height = self.outerHeight - self.margin.top - self.margin.bottom;

    var xMin = 0;
    var xMax = 1000;

    var nTicks = 5;

    var x = d3.scale.linear()
        .domain([xMin, xMax])
        .range([0, self.width]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top")
        .ticks(nTicks);

    self.x = x;
    self.xAxis = xAxis;

    var spacing = 8;
    var barHeight = 8;
    var componentHeight = barHeight * 3;
    var bars = [
      { name: '', color: "#e9d", opacity: 0.6 },
      // { color: "orange", opacity: 0.6 },
      { color: "lightgoldenrodyellow", opacity: 0.6 }
    ]

    var components = self.svg.selectAll(".component")
        .data(data)
        console.log(data)
    console.log(componentOrder)

    var componentsEnter = components.enter().append("g")
      .attr("class", "component")
      .attr("transform", function(d, i) { return "translate(0, "+(componentOrder[d.id] * (componentHeight + spacing))+")"; });

    components.transition()
      .attr("transform", function(d, i) { debugger; return "translate(0, "+(componentOrder[d.id] * (componentHeight + spacing))+")"; });


    bars.forEach(function(bar, n) {
      componentsEnter.append("rect")
        .attr("class", "bar bar-"+n)
        .attr('fill', bar.color)
        .attr('opacity', bars.opacity)
        .attr("y", (n * barHeight))
        .attr("height", barHeight)
        .attr("x", x(0))
        .attr("width", function(d) { return Math.abs(x(d.current.value.point)); });
    });

    components.select(".bar-0").transition()
      .attr("width", function(d) { return Math.abs(x(d.current.value.point)); });

    components.select(".bar-1").transition()
      .attr("width", function(d) { return Math.abs(x(d.comparison.value.point)); });

    componentsEnter.append("text")
          .attr("class", "bar-label")
          .attr("x", 0)
          .attr("dx", "-0.5em")
          .attr("dy", "1em")
          .text(function(d) { return d.current.key });

    componentsEnter.selectAll("line.horizontalGrid").remove();
    componentsEnter.each(function(d, i) {
      // debugger
      d3.select(this).selectAll("line.horizontalGrid").data(self.x.ticks(nTicks)).enter()
      .append("line")
        .attr({
          "class":"horizontalGrid",
          "x1" : function(d, xi){ return self.x(d);},
          "x2" : function(d, xi){ return self.x(d);},
          "y1" : 0,
          "y2" : componentHeight,
          "fill" : "none",
          "shape-rendering" : "crispEdges",
          "stroke" : "rgba(255, 255, 255, 0.2)",
          "stroke-width" : "1px"
        });
    });

    // componentsEnter.selectAll('.border').remove();
    componentsEnter.append("rect")
      .attr({
        "class": "border",
        "x": 0,
        "width": self.width,
        "y": 0,
        "height": componentHeight,
      });
  };

  return CostsSensitivityComponentsChart;
});

