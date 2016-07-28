import React from 'react';

const Picker = (props) =>
  <span>
    <h1>{props.value}</h1>
    <select
      onChange={e => props.onChange(e.target.value)}
      value={props.value}
    >
    {
      props.options.map(option =>
        <option
          value={option}
          key={option}
        >
        {option}
        </option>
      )
    }
    </select>
  </span>;

export default Picker;

Picker.propTypes = {
  options: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ).isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};
