import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import todoApp from './reducers/reducer';

let store = createStore(todoApp);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('container')
);
// import { combineReducers, createStore } from 'redux';
// import * as reducers from './reducers/reducer';
// import { addTodo, completeTodo, setVisibilityFilter } from './actions/actions';

// let todoApp = combineReducers(reducers);
// let store = createStore(todoApp);

// // 打印初始状态
// console.log(store.getState());

// // 监听 state 更新时，打印日志
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );

// // 发起一系列 action
// store.dispatch(addTodo('Learn about actions'));
// store.dispatch(addTodo('Learn about reducers'));
// store.dispatch(addTodo('Learn about store'));
// store.dispatch(completeTodo(0));
// store.dispatch(completeTodo(1));
// store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

// // 停止监听 state 更新
// unsubscribe();
