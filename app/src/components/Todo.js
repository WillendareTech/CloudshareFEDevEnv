import React from 'react';

const Todo = (props) =>
  <li
    onClick={props.onClick}
    style={{
      textDecoration: props.completed ? 'line-through' : 'none',
      cursor: props.completed ? 'default' : 'pointer',
    }}
  >
    {props.text}
  </li>;

export default Todo;

Todo.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
};
