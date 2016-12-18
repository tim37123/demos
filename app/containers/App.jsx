import React, {Component} from 'react'
import Navbar from '../containers/Navbar'
import {Auth} from '../utils/firebaseUtils';
import {connect} from 'react-redux';
import Alerts from './Alerts';

class App extends Component {
	constructor(props){
		super(props);
	}

  componentWillMount(){
    console.log('AUTH IS: ', + Auth);
  	let dispatch = this.props.dispatch;
  	Auth.authChanged(function(user){
  		if(user){
  			dispatch({type: 'SET_USER_ASYNC', user: user})
  		}else{
  			dispatch({type: 'CLEAR_USER_ASYNC'})
  		}
	  });
  }

  render() {
    return(
      <div>
        <Alerts/>
        <Navbar/>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state){
	return {state: state}
}

export default connect(mapStateToProps)(App);