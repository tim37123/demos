import Immutable from 'immutable'

const initialVal = {"dataset":{"id":9775687,"dataset_code":"FB","database_code":"WIKI","name":"Facebook Inc. (FB) Prices, Dividends, Splits and Trading Volume","description":"End of day open, high, low, close and volume, dividends and splits, and split/dividend adjusted open, high, low close and volume for Facebook, Inc. (FB). Ex-Dividend is non-zero on ex-dividend dates. Split Ratio is 1 on non-split dates. Adjusted prices are calculated per CRSP (www.crsp.com/products/documentation/crsp-calculations)\n\nThis data is in the public domain. You may copy, distribute, disseminate or include the data in other products for commercial and/or noncommercial purposes.\n\nThis data is part of Quandl's Wiki initiative to get financial data permanently into the public domain. Quandl relies on users like you to flag errors and provide data where data is wrong or missing. Get involved: connect@quandl.com\n","refreshed_at":"2017-01-04T22:52:05.566Z","newest_available_date":"2017-01-04","oldest_available_date":"2012-05-18","column_names":["Date","Close"],"frequency":"daily","type":"Time Series","premium":false,"limit":null,"transform":"diff","column_index":4,"start_date":"2014-01-01","end_date":"2014-12-31","data":[["2014-12-31",0.31999999999999],["2014-11-30",2.71],["2014-10-31",-4.05],["2014-09-30",4.22],["2014-08-31",2.17],["2014-07-31",5.36],["2014-06-30",3.99],["2014-05-31",3.52],["2014-04-30",-0.46],["2014-03-31",-8.22],["2014-02-28",5.89]],"collapse":"monthly","order":null,"database_id":4922}}

export default (state = Immutable.List([initialVal]), action) => {
  switch(action.type) {
    case 'NEW_STOCK':
    	console.log('condition met');
    	console.log(action)
        return state.push(action.stock)
    case 'UPDATE_STOCK':
        return state
    case 'DELETE_STOCK':
        return state
    default:
      return state
  }
}