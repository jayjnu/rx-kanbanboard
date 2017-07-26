import { combineReducers } from 'redux';
import suggestApp from './suggestApp';

const defaultState = {};

const kanbanApp = combineReducers({
  suggestApp
})

export default kanbanApp;