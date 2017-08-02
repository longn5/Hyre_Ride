import constants from '../constants/index';

const initialState = {
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.PACKAGES_LOADED:
      return Object.assign({}, state, {
        loading: true,
        data: action.payload
      });
    default:
      return state;
  }
};
