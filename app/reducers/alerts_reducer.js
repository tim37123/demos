import Immutable from 'immutable'

export default (state = Immutable.fromJS({}), action) => {
  switch(action.type) {
    case 'ADD_ALERT':
      return state.push(action.alert)
    case 'DELETE_ALERT':
      return state.updateIn(['alerts'], (alertList) => alertList.delete(action.index))
    default:
      return state
  }
}


//example expected map list of alerts for state {alerts: [{type: 'warning', msg: 'this is a warning'}, {type: 'info', msg: 'this is just info'}]}
//export default (state = Immutable.fromJS({alerts: [{type: 'warning', msg: 'this is a warning'}, {type: 'info', msg: 'this is just info'}]}), action) => {