import Immutable from 'immutable'

export default (state = Immutable.Map({}), action) => {
  switch(action.type) {
    case 'SET_PEER_CONNECTION':
        return Immutable.fromJS({rtc: {peer: action.connection.peerConnection, data: action.connection.dataConnection}})
    case 'SET_USER_AGENT':
        return Immutable.fromJS({userAgent: action.agent})
    default:
      return state
  }
}