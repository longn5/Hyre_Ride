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


const addTrip = (token, driver) => (dispatch, getState) => {
  const passenger = getState().passengerInfo.fields;
  const postData = {
    driver: driver.id,
    token,
    passengerInfo: {
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      pick_street: passenger.pAddress,
      pick_city: passenger.pCity,
      pick_state: passenger.pState,
      pick_zip: passenger.pZip,
      email: passenger.email,
      phoneNumber: passenger.phoneNumber,
      drop_street: passenger.dAddress,
      drop_city: passenger.dCity,
      drop_state: passenger.dState,
      drop_zip: passenger.dZip,
      pick_time: passenger.pDateTime.format('dddd, MMMM, h:mm a'),
      locationInfo: {
        packageName: getState().destinations.visitingLocations.parent.name,
        destinations: getState().destinations.visitingLocations.parent.locations
      }
    },
    completed: false
  };

  const newPostKey = database().ref().child('/trips').push().key;
  const updates = {};
  updates[`/trips/${newPostKey}`] = postData;
  return database().ref().update(updates);
};


export {
  getDriver,
  addTrip
};
