import React, {Component} from 'react';
import {stockAPI} from '../../utils/stockAPI.js';

export default class NewChartForm extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    let url = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=NFLX&callback=?'
    let tempURL = 'http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22AAPL%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D'
    stockAPI.returnQuote(url);
  }

  addStock(){
    console.log('button clicked');
  }

  render() {
    return(
      <div className="form-group row col-sm-12">
        <form>
          <div className="form-group col-sm-4">
            <label htmlFor="formGroupExampleInput">Symbol</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input"/>
          </div>
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
            <label htmlFor="example-date-input">Start Date</label>
            <input className="form-control" type="date" defaultValue="Date" id="start-date-input"/>
          </div>
          <div className="form-group col-sm-4">
            <label htmlFor="example-date-input">End Date</label>
            <input className="form-control" type="date" id="end-date-input"/>
          </div>
          <div className="col-sm-4">
            <button className="btn btn-primary" onClick={this.addStock}>Add Symbol</button>
          </div>
      </form>
      </div>
    );
  }
}