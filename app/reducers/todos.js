import Immutable from 'immutable'

export default (state = Immutable.List(['Code More!']), action) => {
  switch(action.type) {
    case 'addTodo':
      return state.push(action.todo)
    default:
      return state
  }
}

// example of how to navigate via redux action:
// import {routerMiddleware, push} from 'react-router-redux'
// function createFooAction() {
//     return push('/foo);
// }