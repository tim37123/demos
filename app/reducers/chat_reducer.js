import Immutable from 'immutable'

export default (state = Immutable.Map({participants: '', messages: ''}), action) => {
  console.log('in the reducer')
  console.log(action.type)
  switch(action.type) {
    case 'UPDATE_PARTICIPANTS':
    	return state.setIn(['participants'], action.participants.participants)
    case 'UPDATE_MESSAGES':
    	console.log('ACTION');
    	console.log(action.messages.messages);
    	return state.setIn(['messages'], action.messages.messages)
    default:
      return state
  }
}