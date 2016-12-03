import React, {Component} from 'react';
import UserInfoModal from './UserInfoModal';

export default class Participants extends Component {
	constructor(props){
		super(props);
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

    const participants = Object.keys(this.props.participantList).map(function(participant, index){
                            if(this.props.currentUser == this.props.participantList[participant].email){ 
                              return <li style={listStyle} key={participant} data-toggle="modal" data-target="#myModal"><strong>{this.props.participantList[participant].email}</strong></li>
                            }else{ 
                              return <li style={listStyle} key={participant}>{this.props.participantList[participant].email}</li>
                            }
                          }.bind(this));

    return(
      <div style={divStyle}>
        <ul>
          <h4>Current Participants</h4>
          {participants}
          <UserInfoModal/>
        </ul>
      </div>
    );
  }
}