import React, {Component} from 'react';
import StockChart from '../../components/d3_stocks/StockChart';
import NewChartForm from '../../components/d3_stocks/NewChartForm';
// import {connect} from 'react-redux'

export default class StockContainer extends Component {
	// constructor(props){
	// 	super(props);
	// }

  render() {
    return(
      <div className="container">
        <h3>Welcome!</h3>
        <div className="row">
          <div className="col-sm-12">
            This is the stock container
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <NewChartForm/>
          </div>          
        </div>
        <div className="row">
          <div className="col-sm-12">
            <StockChart/>
          </div>
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state){
// 	// return state.get('registration').toJS()
//   const registration = state.get('registration').toJS()
//   const chat = state.get('chat').toJS()
//   return {registration, chat}
// }

// export default connect(mapStateToProps)(ChatContainer);