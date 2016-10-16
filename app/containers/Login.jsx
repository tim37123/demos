import React, {Component} from 'react'
import Navbar from '../containers/Navbar'
import Firebaseutils from '../utils/firebaseUtils';
import {connect} from 'react-redux'

export class Login extends Component {
	constructor(props){
		super(props);
	}

  login(e){
    e.preventDefault()
    let userEmail = this.refs.inputEmail.value
    let userPassword = this.refs.inputPassword.value
    this.props.dispatch({type: 'LOGIN_USER_ASYNC', creds: {email: userEmail, password: userPassword}})
    userEmail = ''
    userPassword = ''
  }

  render() {
    return(
      <div className="jumbotron">
          <form>
            <h1>Login</h1>
            <p>With your email and password</p>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" ref="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" ref="inputPassword" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.login.bind(this)}>Submit</button>
          </form>
      </div>
    );
  }
}

function mapStateToProps(state){
	return {state: state}
}

export default connect(mapStateToProps)(Login);