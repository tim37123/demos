import Immutable from 'immutable'

export default (state = Immutable.Map({participants: ''}), action) => {
  switch(action.type) {
    case 'UPDATE_PARTICIPANTS':
    	return Immutable.fromJS({participants: action.participants.participants})
      return state
    default:
      return state
  }
}