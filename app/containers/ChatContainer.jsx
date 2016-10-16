import React, {Component} from 'react'
import {connect} from 'react-redux'
import Messages from '../components/chat/Messages';
import Participants from '../components/chat/Participants';
import Post from '../components/chat/Post';

class ChatContainer extends Component {
	constructor(props){
		super(props);
	}

  componentWillMount(){
  	if(!this.props.user){
        this.props.history.pushState(null, `/`);
      }
  }

  render() {
    return(
      <div className="container jumbotron">
        <h3>This is the chat container</h3>
        <div className="row">
              <div className="col-sm-9">
                <Messages/>
              </div>
              <div className="col-sm-3">
                <Participants/>
              </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
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