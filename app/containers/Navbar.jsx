import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

export class Navbar extends Component {
	constructor(props){
		super(props);
	}

	logout(){
		this.props.dispatch({type: 'LOGOUT_USER_ASYNC', action: this.props.user});
	}

	render(){
		let loginLogout, chatLink, registerLink;
		if(this.props.user){
			loginLogout = <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
			chatLink = <li><Link to={`/chat`}>Chat</Link></li>
			registerLink = ''
		}else{
			loginLogout = <li><Link to={`/login`}>Login</Link></li>
			registerLink = <li><Link to={`/register`}>Register</Link></li>
			chatLink = ''
		}



		return(
  				<nav className="navbar navbar-default navbar-fixed-bottom">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <span className="navbar-brand" href="#">Brand</span>
				    </div>
				        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					      <ul className="nav navbar-nav">
					        <li><a href="#">Link</a></li>
					        <li><a href="#">Link</a></li>
					        <li><Link to={`/stocks`}>Stocks</Link></li>
					        {chatLink}
					        {registerLink}
					      </ul>
					      <ul className="nav navbar-nav navbar-right">
					        {loginLogout}
					      </ul>
					    </div>
				  </div>
				</nav>
			)
	}
}

function mapStateToProps(state){
	return state.get('registration').toJS()
}

export default connect(mapStateToProps)(Navbar)