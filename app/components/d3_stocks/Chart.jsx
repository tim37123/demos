import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Bar from './Bar';
import Line from './Line';
import * as d3 from "d3";

export default class Chart extends Component {
  constructor(props){
    super(props);
    this.changeChart = this.changeChart.bind(this)
    this.state = {chartView: 'Line'};
  }

  changeChart(event){
    this.setState({chartView: event.target.value});
  }

  render() {
    const divStyle = {
      backgroundColor: '#D8D8D8',
      borderStyle: 'solid',
      borderWidth: 'thin',
      borderRadius: '15px',
      marginLeft: '10px',
      marginBottom: '50px',
      marginTop: '-20px'
    };

    let chartView = this.state.chartView;
    let chart = null;

    if(chartView){
        if (chartView == 'Line') {
          chart = <Line chartData={this.props.stock.dataset.data}/>;
        } else if(chartView == 'Bar'){
          chart = <Bar chartData={this.props.stock.dataset.data}/>;
        }
    }

    return(
      <div className="form-group row col-sm-11" style={divStyle}>
        {this.props.stock.dataset.name}
        <form>
          <div className="row">
            <div className="form-group col-sm-4">
              <label htmlFor="formGroupExampleInput2">Start Date</label>
              <input type="text" className="form-control" placeholder="01/01/2016"/>
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="example-date-input">End Date</label>
              <input type="text" className="form-control" placeholder="01/01/2017"/>
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="exampleSelect1">Chart Type</label>
              <select className="form-control" value={this.state.chartView} onChange={this.changeChart}>
                <option>Line</option>
                <option>Bar</option>
              </select>
            </div>
          </div>
        </form>
        {chart}
      </div>
    );
  }
}