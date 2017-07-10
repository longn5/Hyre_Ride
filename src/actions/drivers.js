import { database } from '../config/firebase';
import actionType from '../constants/index';
import DriverModel from '../models/driver';
import moment from 'moment';

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
        if (moment(customerTime).unix() >= start && moment(customerTime).unix() <= end) {
          drivers.push(DriverModel(snapshotval.val(), snapshotval.key));
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
