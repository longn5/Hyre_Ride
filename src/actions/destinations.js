import actionType from '../constants/index';
import { database } from '../config/firebase';
import {getHoursFromLocations} from '../utils/utils';
import DestinationModel from '../models/destination';

const getDestinations = id => (dispatch) => {
  dispatch({
    type: actionType.LOADING,
    payload: []
  });
  database().ref(`/packages/${id}`).once('value').then((snapshot) => {
    const destinations = [];
    snapshot.forEach((snapshotval) => {
      destinations.push(DestinationModel(snapshotval.val()));
    });
    console.log(destinations);
    dispatch({
      type: actionType.DESTINATIONS_LOADED,
      payload: destinations
    });
  })
  .catch(() => {
    dispatch({
      type: actionType.ERROR,
      payload: []
    });
  });
};

const addSelectedDestination = value => (dispatch, getState) => {
  const valueParts = value.split(',');
  const payload = {
    visitingLocations: {},
    selectedLocation: value
  };
  let error = false;

  if (getState().destinations.visitingLocations.parent.name) {
    payload.visitingLocations = getState().destinations.visitingLocations;
    const maxHoursExceeded = getHoursFromLocations(
      payload.visitingLocations.parent.locations,
      valueParts[2]
    );

    if (maxHoursExceeded) {
      error = true;
    } else {
      payload.visitingLocations.parent.locations[valueParts[1]] = parseInt(valueParts[2], 10);
    }
  } else {
    payload.visitingLocations.parent = {
      name: valueParts[0],
      locations: {
        [valueParts[1]]: parseInt(valueParts[2], 10)
      }
    };
  }

  if (error) {
    dispatch({
      type: actionType.ERROR,
      payload: 'Please limit your visits to be less than 4 hours'
    });
  } else {
    dispatch({
      type: actionType.DESTINATION_ADDED,
      payload
    });
  }
};

const removeDestinations = value => (dispatch, getState) => {
  const valueParts = value.split(',');
  const visitingLocations = getState().destinations.visitingLocations;
  delete visitingLocations.parent.locations[valueParts[1]];

  dispatch({
    type: actionType.DESTINATION_ADDED,
    payload: visitingLocations
  });
};

const resetDestinations = value => (dispatch, getState) => {
  const valueParts = value.split(',');
  const destinations = getState().packages.destinations;
  delete destinations.parent.locations[valueParts[1]];

  dispatch({
    type: actionType.DESTINATION_ADDED,
    payload: destinations
  });
};
  // let saveData = {
  //   parent: data[0],
  //   values: ''
  // }
  //

export {
  removeDestinations,
  getDestinations,
  addSelectedDestination
};
