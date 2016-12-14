import React, {Component} from 'react'
import Request from 'react-http-request'

export default class StockChart extends Component {
	constructor(props){
		super(props);
	}

  render() {
    return(
      <div className="container">
          <div>This is the StockChart component</div>
          <Request
            url='http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=NFLX&callback=myFunction'
            method='get'
            accept='application/json'
            verbose={true}
          >
            {
              ({error, result, loading}) => {
                if (loading) {
                  return <div>loading...</div>;
                } else {
                  return <div>{ JSON.stringify(result) }</div>;
                }
              }
            }
        </Request>
      </div>
    );
  }
}