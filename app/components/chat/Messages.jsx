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
    return(
      <div style={divStyle}>
        This is the messages component.
      </div>
    );
  }
}