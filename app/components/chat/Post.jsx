import React, {Component} from 'react'

export default class Post extends Component {
	constructor(props){
		super(props);
	}

  render() {
    var divStyle = {
      display: 'block',
      border: 'solid',
      height: '40px',
      borderWidth: '3px',
      borderRadius: '5px',
      marginTop: '-40px',
      backgroundColor: '#F8F8FF'
    };
    return(
      <div style={divStyle}>
          <input type="text" className="form-control"/>
      </div>
    );
  }
}