import { database } from '../config/firebase';
import actionType from '../constants/index';
import DriverModel from '../models/driver';

const getAllDrivers = () => (dispatch, getState) => {
  const customerTime = getState().passengerInfo.fields.pDateTime.utc();
  dispatch({
    type: actionType.LOADING,
    payload: []
  });
  database().ref('/drivers/').once('value').then((snapshot) => {
    const drivers = [];
    snapshot.forEach((snapshotval) => {
      const availableDates = Object.values(snapshotval.val().available_dates);
      availableDates.forEach((obj) => {
        const seconds = obj.hours * 3600;
        const start = obj.date_UTC;
        const end = obj.date_UTC + seconds;
        if (customerTime >= start && customerTime <= end) {
          drivers.push(DriverModel(snapshotval.val(), Object.keys(snapshot.val())[0]));
        }
      });
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
