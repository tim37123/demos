import Immutable from 'immutable'

export default (state = Immutable.Map({participants: '', messages: ''}), action) => {
  switch(action.type) {
    case 'UPDATE_PARTICIPANTS':
    	return state.setIn(['participants'], action.participants.participants)
    case 'UPDATE_USER_INFO':
    	return state
    case 'UPDATE_MESSAGES':
    	return state.setIn(['messages'], action.messages.messages)
    default:
      return state
  }
}