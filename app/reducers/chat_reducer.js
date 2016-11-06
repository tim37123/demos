import Immutable from 'immutable'

export default (state = Immutable.Map({}), action) => {
  switch(action.type) {
    case 'SET_PARTICIPANT':
        return state.getIn('participants').push(action.participant)
    default:
      return state
  }
}