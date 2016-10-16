import React, {Component} from 'react'
import Navbar from '../containers/Navbar'
import Firebaseutils from '../utils/firebaseUtils';
import {connect} from 'react-redux'

class App extends Component {
	constructor(props){
		super(props);
	}

  componentWillMount(){
  	let dispatch = this.props.dispatch;
  	Firebaseutils.authChanged(function(user){
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