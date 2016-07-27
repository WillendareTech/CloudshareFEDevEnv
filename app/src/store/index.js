import { combineReducers, createStore } from 'redux';
import * as reducers from './reducers';

let todoApp = combineReducers(reducers);
let store = createStore(todoApp);
