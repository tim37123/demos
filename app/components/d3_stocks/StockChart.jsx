import React, {Component} from 'react';
import Chart from './Chart';

export default class StockChart extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const stocks = Object.keys(this.props.stocks).map(function(stock, index){
                          return <Chart stock={this.props.stocks[index]} key={index}/>
                        }.bind(this));
    return(
        <div>
          {stocks}
        </div>
      );
  }
}