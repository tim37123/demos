import React, {Component} from 'react'
import {connect} from 'react-redux'
import Messages from '../components/chat/Messages';
import Participants from '../components/chat/Participants';
import Post from '../components/chat/Post';
import {Chat} from '../utils/firebaseUtils';

class ChatContainer extends Component {
	constructor(props){
		super(props);
	}

  componentWillMount(){
  	if(!this.props.user){
        this.props.history.pushState(null, `/`);
      }else{
        this.watchParticipantsChanged()
      }
  }

  getUserAgent(){
    this.props.dispatch({type:'GET_USER_AGENT_ASYNC'})
  }

  getPeerConnection(){
    this.props.dispatch({type:'PEER_CONNECT_ASYNC'})
  }

  // This is a hack but sagas sucks at dealing with event listeners. Need to implement this style to do it by the book: 
  // http://stackoverflow.com/questions/34859932/can-i-use-redux-sagas-es6-generators-as-onmessage-listener-for-websockets-or-ev/34866840?noredirect=1#comment57501919_34866840
  // or look at firebase-sagas that may have a library to solve this
  watchParticipantsChanged(){
    let participantsListener = Chat.watchParticipants();
    participantsListener.on('value', (snapshot) => {
      this.props.dispatch({type:'UPDATE_PARTICIPANTS_ASYNC', participants: snapshot})
    });
    console.log('Participants listener activated');
  }

  getDataConnection(){
    let dataConnectData = rtc.buildDataConnection()
    console.log('Get Data Connection') 
  }

  render() {
    var divStyle = {
      backgroundColor: '#D3D3D3',
      display: 'block',
      height: '600px'
    }

    return(
      <div className="container" style={divStyle}>
        <h3>Welcome to the chat!</h3>
        <button onClick={this.getPeerConnection.bind(this)}>Peer</button>
        <button onClick={this.getUserAgent.bind(this)}>GetUserAgent</button>
        <div className="row">
              <div className="col-sm-9">
                <Messages/>
              </div>
              <div className="col-sm-3">
                <Participants/>
              </div>
              <div className="col-sm-9">
                <Post/>
              </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
	return state.get('registration').toJS()
}

export default connect(mapStateToProps)(ChatContainer);