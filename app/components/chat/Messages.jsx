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
      overflowY: 'scroll',
      backgroundColor: '#F8F8FF'
    };

    const listStyleCurrentUser = {
      listStyleType: 'none',
      backgroundColor: '#A9A9A9'
    };

    const listStyleNotCurrentUser = {
      listStyleType: 'none'
    };

    const messages = Object.keys(this.props.messageList).map(function(message, index){
                                if(this.props.currentUser == this.props.messageList[message].poster){ 
                                  return <li style={listStyleCurrentUser} key={message}><strong>{this.props.messageList[message].poster}</strong> : {this.props.messageList[message].body}</li>
                                }else{ 
                                  return <li style={listStyleNotCurrentUser} key={message}><strong>{this.props.messageList[message].poster}</strong> : {this.props.messageList[message].body}</li>
                                }
                              }.bind(this));

    return(
      <div style={divStyle}>
        {messages}
      </div>
    );
  }
}