import React from 'react'

const NewTodo = ({onChange}) => (
  <div>
    <input type="text" onKeyUp={onChange} />
    {' - '}Press Enter to Add ToDo!
  </div>
)

export default NewTodo;