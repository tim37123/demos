import React, {Component} from 'react'

export default class Post extends Component {
	constructor(props){
		super(props);
	}

  sendMessage(e){
    if(e.keyCode == 13){
      this.props.addMessage(e.target.value);
      e.target.value = '';
    }
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
          <input type="text" className="form-control" onKeyDown={this.sendMessage.bind(this)}/>
      </div>
    );
  }
}