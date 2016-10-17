import React, {Component} from 'react'

export default class Participants extends Component {
	constructor(props){
		super(props);
	}

  render() {
    var divStyle = {
      display: 'block',
      border: 'solid',
      height: '500px',
      borderWidth: '3px',
      borderRadius: '5px',
      overflowY: 'scroll',
      backgroundColor: '#F8F8FF'
    };

    return(
      <div style={divStyle}>
        This is the participants component.
      </div>
    );
  }
}