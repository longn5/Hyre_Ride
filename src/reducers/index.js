import {combineReducers} from 'redux';
import drivers from './drivers';
import driver from './driver';
import packages from './packages';
import destinations from './destinations';
import passengerInfo from './passengerInfo';
import checkout from './checkout';

export default combineReducers({
  drivers,
  driver,
  packages,
  passengerInfo,
  checkout,
  destinations
});
