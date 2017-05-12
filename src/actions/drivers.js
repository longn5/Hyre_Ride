import { database } from '../config/firebase';
import actionType from '../constants/index';
import DriverModel from '../models/driver';

const getAllDrivers = () => (dispatch) => {
  dispatch({
    type: actionType.LOADING,
    payload: []
  });
  database().ref('/drivers/').once('value').then((snapshot) => {
    const drivers = [];
    console.log(snapshot.val());
    snapshot.forEach((snapshotval) => {
      drivers.push(DriverModel(snapshotval.val()));
    });
    dispatch({
      type: actionType.DRIVERS_LOADED,
      payload: drivers
    });
  })
  .catch(() => {
    dispatch({
      type: actionType.ERROR,
      payload: null
    });
  });
};

export {
  getAllDrivers
};
