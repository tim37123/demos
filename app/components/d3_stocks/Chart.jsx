import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";

export default class Chart extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.buildLineChart(this.props.stock.dataset.data)
  }

  buildLineChart(data){
    var svg = d3.select(ReactDOM.findDOMNode(this)).select("svg"),
              margin = {top: 20, right: 20, bottom: 30, left: 50},
              width = +svg.attr("width") - margin.left - margin.right,
              height = +svg.attr("height") - margin.top - margin.bottom,
              g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.timeParse("%Y-%m-%d");

    var x = d3.scaleTime().rangeRound([0, width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var data = data.map(function(d){
      return [parseTime(d[0]), +d[1]]
    });

    var line = d3.line()
      .x(function(d){
        return x(d[0])
      })
      .y(function(d){
        return y(d[1]) 
      });

    x.domain(d3.extent(data, function(d) { return d[0]; }));
    y.domain(d3.extent(data, function(d) { return d[1]; }));

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 50)
        .attr("dy", "0.6em")
        .attr("text-anchor", "end")
        .text("Delta ($)");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 3)
        .attr("d", line);

  }

  render() {
    const divStyle = {
      backgroundColor: '#D8D8D8',
      borderStyle: 'solid',
      borderWidth: 'thin',
      borderRadius: '15px',
      marginLeft: '10px',
      marginRight: '10px',
      marginBottom: '50px',
      marginTop: '-20px'
    };

    return(
      <div className="form-group row col-sm-12" style={divStyle}>
        {this.props.stock.dataset.name}
        <form>
          <div className="row">
            <div className="form-group col-sm-4">
              <label htmlFor="selectGroup">Period</label>
              <select className="form-control" id="selectGroup">
                <option>Minute</option>
                <option>Hour</option>
                <option>Day</option>
                <option>Week</option>
                <option>Month</option>
                <option>Quarter</option>
                <option>Year</option>
              </select>
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="formGroupExampleInput2">Data Interval</label>
              <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="example-date-input">Number of Days</label>
              <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
            </div>
          </div>
          <div className="row" id="lineChartContainer">
            <svg width="1200" height="300"></svg>
          </div>
        </form>
      </div>
    );
  }
}