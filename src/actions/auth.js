import { firebaseAuth, facebookAuthProvider } from '../config/firebase';
import actionType from '../constants/index';
import UserModel from '../models/user';

const facebookLogin = () => (dispatch) => {
  dispatch({
    type: actionType.LOGIN_IN_PROGRESS,
    payload: null
  });
  firebaseAuth().signInWithPopup(facebookAuthProvider).then((result) => {
    const user = UserModel(result.user.providerData[0]);
    localStorage.setItem('driversforhire-37d4f', JSON.stringify(user));
    dispatch({
      type: actionType.LOGGED_IN,
      payload: user
    });
  }).catch(() => {
    dispatch({
      type: actionType.ERROR,
      payload: null
    });
  });
};

const signOut = () => (dispatch) => {
  dispatch({
    type: actionType.SIGNOUT_IN_PROGRESS,
    payload: null
  });
  localStorage.removeItem('driversforhire-37d4f');
  firebaseAuth().signOut().then((result) => {
    dispatch({
      type: actionType.SIGNED_OUT,
      payload: result
    });
  }).catch((e) => {
    dispatch({
      type: actionType.ERROR,
      payload: e
    });
  });
};

export {
  facebookLogin,
  signOut
};
