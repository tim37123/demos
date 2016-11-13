import Immutable from 'immutable'

export default (state = Immutable.Map({participants: ''}), action) => {
  switch(action.type) {
    case 'ADD_PARTICIPANT':
        return state
    case 'DELETE_PARTICIPANT':
        return state
    case 'UPDATE_PARTICIPANTS':
    	console.log('update partcipants called');
    	console.log(state);
        return state.getIn('participants').set('participants', action.participants)
    default:
      return state
  }
}