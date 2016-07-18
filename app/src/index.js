import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoCompleteComponent from './components/AutoCompleteComponent';

const App = () => (
  <MuiThemeProvider>
    <AutoCompleteComponent />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
