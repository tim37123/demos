import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";

export default class Bar extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.buildBarChart(this.props.chartData)
  }

  buildBarChart(data){
    var svg = d3.select(ReactDOM.findDOMNode(this)).select("svg"),
              margin = {top: 10, right: 30, bottom: 30, left: 30},
              width = +svg.attr("width") - margin.left - margin.right,
              height = +svg.attr("height") - margin.top - margin.bottom,
              g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.timeParse("%Y-%m-%d");

    var formatCount = d3.format(",.0f");

    var data = data.map(function(d){
      return [parseTime(d[0]), +d[1]]
    });

    var x = d3.scaleTime().domain(d3.extent(data, function(d) { return d[0]; })).range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var barCount = width / data.length()
    
    var histogram = d3.histogram()
      .value(function(d){return d[0]})
      .domain(x.domain())
      .thresholds(x.ticks(d3.timeWeek));

    g.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));

    var bins = histogram(data);

    y.domain([0, d3.max(bins, function(d) { return d[1]; })]);


    var bar = svg.selectAll(".bar")
                 .data(bins)
                 .enter().append("g")
                 .attr("class", "bar")
                 .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

              bar.append("rect")
                  .attr("x", 1)
                  .attr("width", function(d) { return (1/barCount) - 1; })
                  .attr("height", function(d) { return height - y(d.length); });

              bar.append("text")
                  .attr("dy", ".75em")
                  .attr("y", 6)
                  .attr("x", function(d) { return ((1/barCount) - 1) / 2; })
                  .attr("text-anchor", "middle")
                  .text(function(d) { return formatCount(d.length); });


    // g.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x))
    //     .select(".domain")
    //     .remove();

    // g.append("g")
    //     .call(d3.axisLeft(y))
    //     .append("text")
    //     .attr("fill", "#000")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", 50)
    //     .attr("dy", "0.6em")
    //     .attr("text-anchor", "end")
    //     .text("Delta ($)");

    // g.append("path")
    //     .datum(data)
    //     .attr("fill", "none")
    //     .attr("stroke", "steelblue")
    //     .attr("stroke-linejoin", "round")
    //     .attr("stroke-linecap", "round")
    //     .attr("stroke-width", 3)
    //     .attr("d", line);

  }

  render() {
    return(
        <div className="row" id="lineChartContainer">
            Bar
            <svg width="1200" height="300"></svg>
        </div>
    );
  }
}