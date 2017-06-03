import {combineReducers} from 'redux';
import drivers from './drivers';
import driver from './driver';
import packages from './packages';
import destinations from './destinations';

export default combineReducers({
  drivers,
  driver,
  packages,
  destinations
});
