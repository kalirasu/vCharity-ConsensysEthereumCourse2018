import { combineReducers } from 'redux';
import HomePageReducer from './HomePageReducer';
import projectReducer from './projectReducer';

export default combineReducers({
  homePage: HomePageReducer,
  project: projectReducer,
});
