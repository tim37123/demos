import React from 'react'
import { connect } from 'react-redux'

import NewTodo from '../containers/NewTodo'

import Todo from '../components/Todo'

const Todos = ({todos, dispatch}) => (
  <div>
    <h1>Todos</h1>
    <h4>NOTE: Sagas is being used to delay dispach of new todos by 1 second</h4>
    <NewTodo onChange={e => {
						      if(e.keyCode == 13){
						        dispatch({type: 'ADD_TODO_ASYNC', todo: e.target.value})
						        e.target.value = ''
						      }}}/>
    {todos.map(todo => <Todo key={todo} item={todo}></Todo>)}
  </div>
)

function mapStateToProps(state) {
  return {
    todos: state.get('todos')
  }
}

export default connect(mapStateToProps)(Todos)