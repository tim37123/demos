import React, {Component} from 'react'

export default class Participants extends Component {
	constructor(props){
		super(props);
	}

  componentWillMount(){
    console.log("PARTICIPANT PROPS");
    console.log(typeof(this.props.participantList));
    console.log(this.props.participantList);
  }

  render() {
    const divStyle = {
      display: 'block',
      border: 'solid',
      height: '500px',
      borderWidth: '3px',
      borderRadius: '5px',
      overflowY: 'scroll',
      backgroundColor: '#F8F8FF'
    };

    const listStyle = {
      listStyleType: 'none'
    };

    const participants = Object.keys(this.props.participantList).map((participant, index) =>
                            <li style={listStyle} key={participant}>{this.props.participantList[participant]}</li>
                          );

    return(
      <div style={divStyle}>
        <ul>
          <h4>Current Participants</h4>
          {participants}
        </ul>
      </div>
    );
  }
}