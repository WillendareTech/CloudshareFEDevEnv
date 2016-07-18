import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import style from './style.css';

export default class AutoCompleteComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    }
  }

  handleUpdateInput(value) {
    this.setState({
      dataSource: [
        value,
        value + value
      ]
    });
  }

  render() {
    return (
      <div className={style.bgSize}>
        <AutoComplete
          hintText='Type anything'
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
        />
        <AutoComplete
          hintText='Type anything'
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          floatingLabelText='Full width'
          fullWidth={true}
        />
      </div>
    );
  }
}
