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
  	if(!this.props.registration.user){
        this.props.history.pushState(null, `/`);
      }else{
        const participantRef = Chat.getParticipantsRef()
        const messagesRef = Chat.getMessagesRef()
        this.watchParticipantsChanged(participantRef)
        this.watchMessagesChanged(messagesRef)
      }
  }

  getUserAgent(){
    this.props.dispatch({type:'GET_USER_AGENT_ASYNC'})
  }

  getPeerConnection(){
    this.props.dispatch({type:'PEER_CONNECT_ASYNC'})
  }

  addMessage(msg){
    const chatMessage = {body: msg, timestamp: Date.now(), poster: this.props.registration.user.email}
    this.props.dispatch({type: 'ADD_MESSAGE_ASYNC', msg: chatMessage})
  }

  // This is a hack but sagas sucks at dealing with event listeners. Need to implement this style to do it by the book: 
  // http://stackoverflow.com/questions/34859932/can-i-use-redux-sagas-es6-generators-as-onmessage-listener-for-websockets-or-ev/34866840?noredirect=1#comment57501919_34866840
  // or look at firebase-sagas that may have a library to solve this
  watchParticipantsChanged(participantsRef){
    participantsRef.on('value', (snapshot) => {
      this.props.dispatch({type:'UPDATE_PARTICIPANTS_ASYNC', participants: snapshot.val()})
    });
    console.log('Participants listener activated');
  }

  watchMessagesChanged(messagesRef){
    messagesRef.on('value', (snapshot) => {
      this.props.dispatch({type:'UPDATE_MESSAGES_ASYNC', messages: snapshot.val()})
    });
    console.log('Messages listener activated');
  }

  updateUserInfo(data){
    const payload = {userUpdateInfo: data, uid: this.props.registration.user.uid}
    this.props.dispatch({type: 'UPDATE_USER_INFO_ASYNC', info: payload})
  }

  getDataConnection(){
    let dataConnectData = rtc.buildDataConnection()
    console.log('Getting RTC Data Connection') 
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
        <div className="row">
              <div className="col-sm-9">
                <Messages messageList={this.props.chat.messages} currentUser={this.props.registration.user.email}/>
              </div>
              <div className="col-sm-3">
                <Participants participantList={this.props.chat.participants} currentUser={this.props.registration.user.email} userUpdate={this.updateUserInfo.bind(this)}/>
              </div>
              <div className="col-sm-9">
                <Post addMessage={this.addMessage.bind(this)}/>
              </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
	// return state.get('registration').toJS()
  const registration = state.get('registration').toJS()
  const chat = state.get('chat').toJS()
  return {registration, chat}
}

export default connect(mapStateToProps)(ChatContainer);