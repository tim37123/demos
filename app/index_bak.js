import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from './containers/App';
import About from './components/About';
import Todos from './containers/Todos';
import Login from './containers/Login';
import Chat from './containers/ChatContainer';
import Stocks from './containers/d3_stocks/StockContainer';
import Home from './components/Home';
import DevTools from './containers/DevTools';
import {store, history} from './redux-router-init';
import { AppContainer } from 'react-hot-loader';
import Register from './containers/Register';

ReactDOM.render(
	<Provider store={store}>
		<div>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Home}/>
				<Route path="/about" component={About}/>
				<Route path="/todos" component={Todos}/>
				<Route path="/register" component={Register}/>
				<Route path="/login" component={Login}/>
				<Route path="/chat" component={Chat}/>
				<Route path="/stocks" component={Stocks}/>
			</Route>
		</Router>
		{ DEVELOPMENT ? <DevTools/> : ''}
		</div>
	</Provider>,
	document.getElementById('root')
);