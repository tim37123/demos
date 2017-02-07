import React, {Component} from 'react';
import StockChart from '../../components/d3_stocks/StockChart';
import demoUtils from '../../utils/genUtils.js';
import {stockAPI} from '../../utils/stockAPI.js';
import {connect} from 'react-redux';

class StockContainer extends Component {
  constructor(props){
    super(props);
  }

  addStock(){
    const symbol = this.refs.tickerSymbol.value;
    this.refs.tickerSymbol.value = '';

    let stockRequest = stockAPI.returnQuote(symbol)
    stockRequest.done(function(data) {
      this.props.dispatch({type: 'NEW_STOCK', stock: data})
    }.bind(this));
  }

  render() {
    const divStyle = {
      margin: '5px'
    };

    return(
      <div style={divStyle} className="row">
        <h2>View Stocks</h2>
        <div className="form-group row col-sm-12">
          <form>
            <div className="form-group col-sm-4">
              <label htmlFor="formGroupExampleInput">What stock do you want to see? (Symbol)</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input" ref="tickerSymbol"/>
            </div>
            <div className="col-sm-4">
              <button className="btn btn-primary" onClick={this.addStock.bind(this)}>Lookup</button>
            </div>
        </form>
        </div>

        <StockChart stocks={this.props.stocks}/>

      </div>
    );
  }
}

function mapStateToProps(state){
	// return state.get('registration').toJS()
  const registration = state.get('registration').toJS()
  const stocks = state.get('stocks').toJS()
  const chat = state.get('chat').toJS()
  return {registration, chat, stocks}
}

export default connect(mapStateToProps)(StockContainer);