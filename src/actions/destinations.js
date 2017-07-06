import constant from '../constants/index';
import { database } from '../config/firebase';
import {getHoursFromLocations} from '../utils/utils';
import DestinationModel from '../models/destination';

const getDestinations = id => (dispatch) => {
  dispatch({
    type: constant.LOADING,
    payload: []
  });
  database().ref(`/packages/${id}`).once('value').then((snapshot) => {
    const destinations = [];
    snapshot.forEach((snapshotval) => {
      destinations.push(DestinationModel(snapshotval.val()));
    });
    dispatch({
      type: constant.DESTINATIONS_LOADED,
      payload: destinations
    });
  })
  .catch(() => {
    dispatch({
      type: constant.ERROR,
      payload: []
    });
  });
};

const addSelectedDestination = value => (dispatch, getState) => {
  const valueParts = value.split('++');
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
      payload.visitingLocations.parent.locations[valueParts[1]] = `${valueParts[2]}++${valueParts[3]}`;
    }
  } else {
    payload.visitingLocations.parent = {
      name: valueParts[0],
      locations: {
        [valueParts[1]]: `${valueParts[2]}++${valueParts[3]}`
      }
    };
  }

  if (error) {
    dispatch({
      type: constant.ERROR,
      payload: `Please limit your time to be less than ${constant.TOTAL_TIME_TO_SPEND}`
    });
  } else {
    dispatch({
      type: constant.DESTINATION_ADDED,
      payload
    });
  }
};

const removeDestinations = value => (dispatch, getState) => {
  const valueParts = value.split(',');
  const visitingLocations = getState().destinations.visitingLocations;
  delete visitingLocations.parent.locations[valueParts[1]];
  dispatch({
    type: constant.DESTINATION_REMOVED,
    payload: visitingLocations
  });
};

const resetError = () => (dispatch) => {
      dispatch({
      type: constant.ERROR,
      payload: null
    });
}

// const resetDestinations = value => (dispatch, getState) => {
//   const valueParts = value.split(',');
//   const destinations = getState().packages.destinations;
//   delete destinations.parent.locations[valueParts[1]];

//   dispatch({
//     type: constant.DESTINATION_REMOVED,
//     payload: destinations
//   });
// };

export {
  removeDestinations,
  getDestinations,
  resetError,
  addSelectedDestination
};
