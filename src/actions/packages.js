import actionType from '../constants/index';
import { database } from '../config/firebase';
import PackagesModel from '../models/packages';

export const getAllpackages = () => (dispatch) => {
  dispatch({
    type: actionType.LOADING,
    payload: []
  });

  database().ref('/package_details').once('value').then((snapshot) => {
    const packages = [];
    snapshot.forEach((snapshotval) => {
      packages.push(PackagesModel(snapshotval.val()));
    });
    dispatch({
      type: actionType.PACKAGES_LOADED,
      payload: packages
    });
  })
  .catch(() => {
    dispatch({
      type: actionType.ERROR,
      payload: []
    });
  });
};
