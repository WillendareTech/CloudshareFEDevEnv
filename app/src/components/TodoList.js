import React from 'react';
import Todo from './Todo';

const TodoList = (props) =>
  <ul>
  {
    props.todos.map((todo, index) =>
      <Todo
        {...todo}
        key={index}
        onClick={() => props.onTodoClick(index)}
      />
    )
  }
  </ul>;

export default TodoList;

TodoList.propTypes = {
  onTodoClick: React.PropTypes.func.isRequired,
  todos: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      completed: React.PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
};
