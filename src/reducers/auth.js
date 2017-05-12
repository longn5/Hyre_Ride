import constants from '../constants/index';

const getUser = () => {
  const user = localStorage.getItem('driversforhire-37d4f');
  return JSON.parse(user);
};

const initialState = {
  user: getUser(),
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.LOGIN_IN_PROGRESS:
      return Object.assign({}, state, {
        loading: true
      });
    case constants.LOGGED_IN:
      return Object.assign({}, {
        loading: false,
        user: Object.assign({}, action.payload)
      });
    case constants.SIGNED_OUT:
      return Object.assign({}, {
        loading: false,
        user: null
      });
    case constants.ERROR:
      return Object.assign({}, {
        loading: false,
        user: null
      });
    default:
      return state;
  }
};
