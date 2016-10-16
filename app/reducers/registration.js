import Immutable from 'immutable'

export default (state = Immutable.Map({}), action) => {
  console.log('reducer called')
  console.log(action)
  switch(action.type) {
    case "SET_USER":
    	return Immutable.fromJS({user: {email: action.user.email, uid: action.user.uid}})
    case "CLEAR_USER":
    	return Immutable.Map({})
    case "REGISTRATION_FAILED":
        return state
    case 'REGISTER':
        return state
    case "LOGOUT_FAILED":
        return state
    case "LOGOUT":
        return state
    case "LOGIN_FAILED":
        return state
    case "LOGIN":
        return state
    default:
      return state
  }
}