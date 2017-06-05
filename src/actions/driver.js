import actionType from '../constants/index';
import { database } from '../config/firebase';
import DriverModel from '../models/driver';

const getDriver = id => (dispatch) => {
  dispatch({
    type: actionType.LOADING,
    payload: null
  });
  database().ref(`/drivers/${id}`).once('value').then((snapshot) => {
    const driver = DriverModel(snapshot.val());
    dispatch({
      type: actionType.DRIVER_LOADED,
      payload: driver
    });
  })
  .catch(() => {
    dispatch({
      type: actionType.ERROR,
      payload: null
    });
  });
};

const passengerInfo = info => (dispatch) => {
  dispatch({
    type: actionType.PASSENGER_INFO,
    payload: info
  });
};

const selectDriver = id => (dispatch) => {
  dispatch({
    type: actionType.DRIVER_SELECTED,
    payload: id
  });
};


export {
  getDriver,
  passengerInfo,
  selectDriver
};
