import React, {Component} from 'react'

export default class Messages extends Component {
	constructor(props){
		super(props);
	}

  render() {
    var divStyle = {
      display: 'block',
      border: 'solid',
      height: '470px',
      borderWidth: '3px',
      borderRadius: '5px',
      overflow: 'hidden',
      backgroundColor: '#F8F8FF',
    };

    const listStyleCurrentUser = {
      listStyleType: 'none',
      backgroundColor: '#A9A9A9',
      textAlign: 'right'
    };

    const listStyleNotCurrentUser = {
      listStyleType: 'none'
    };

    const messages = Object.keys(this.props.messageList).map(function(message, index){
                                let usernameOrEmail = this.props.messageList[message].username || this.props.messageList[message].poster;

                                if(this.props.currentUser.email == this.props.messageList[message].poster){
                                  return <li style={listStyleCurrentUser} key={message}><strong>{usernameOrEmail}</strong> : {this.props.messageList[message].body}</li>
                                }else{ 
                                  return <li style={listStyleNotCurrentUser} key={message}><strong>{usernameOrEmail}</strong> : {this.props.messageList[message].body}</li>
                                }
                              }.bind(this));

    return(
      <div style={divStyle}>
        {messages}
      </div>
    );
  }
}