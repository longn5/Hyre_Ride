import {combineReducers} from 'redux';
import auth from './auth';
import drivers from './drivers';

export default combineReducers({
  auth,
  drivers
});
