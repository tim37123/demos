import React, {Component} from 'react';
import {connect} from 'react-redux'

export class Register extends Component {
	constructor(props){
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onFormSubmit(event) {
		event.preventDefault();
		var email = this.refs.email.value;
		var password = this.refs.password.value;
		this.props.dispatch({type: 'REGISTER_USER_ASYNC', creds: {'email': email, 'password': password}})
	}

	render(){
		return(
		      <div className="col-md-4">
		        <form id="frmRegister" role="form" onSubmit={this.onFormSubmit}>
		          <h2>Register</h2>
		          <div className="form-group">
		            <label htmlFor="txtRegEmail">Email address</label>
		            <input type="email" className="form-control" ref="email" id="txtEmail" placeholder="Enter email"
		                   name="email"/>
		          </div>
		          <div className="form-group">
		            <label htmlFor="txtRegPass">Password</label>
		            <input type="password" className="form-control" ref="password" id="txtPass" placeholder="Password"
		                   name="password"/>
		          </div>
		          <button type="submit" className="btn btn-default">Register</button>
		        </form>
		      </div>
			)
	}
}

function mapStateToProps(state){
	return {state: state}
}

export default connect(mapStateToProps)(Register);