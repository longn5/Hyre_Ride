import actionType from '../constants/index';
import { database } from '../config/firebase';

const getPackage = id => (dispatch) => {
  dispatch({
    type: actionType.LOADING,
    payload: []
  });
  database().ref(`/packages/${id}`).once('value').then((snapshot) => {
    const wines = [];
    snapshot.forEach((snapshotval) => {
      wines.push(snapshotval.val());
    });

    dispatch({
      type: actionType.PACKAGE_LOADED,
      payload: wines
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
  let destinations = {};
  if (getState().packages.destinations.parent) {
    destinations = getState().packages.destinations;
    destinations.parent.locations[valueParts[1]] = valueParts[2];
  } else {
    destinations.parent = {
      name: valueParts[0],
      locations: {
        [valueParts[1]]: valueParts[2]
      }
    };
  }
  dispatch({
    type: actionType.DESTINATION_ADDED,
    payload: destinations
  });
};

const removeDestinations = value => (dispatch, getState) => {
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
  getPackage,
  addSelectedDestination
};
