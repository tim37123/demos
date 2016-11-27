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

    const listStyle = {
      listStyleType: 'none'
    };

    const messages = Object.keys(this.props.messageList).map((message, index) =>
                            <li style={listStyle} key={message}>{this.props.messageList[message].body}</li>
                          );

    return(
      <div style={divStyle}>
        This is the messages component.
        {messages}
      </div>
    );
  }
}