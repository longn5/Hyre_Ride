import constants from '../constants/index';

const initialState = {
  data: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.LOADING:
      return Object.assign({}, state, {
        loading: true,
        data: []
      });
    case constants.DRIVERS_LOADED:
      return Object.assign({}, state, {
        loading: false,
        data: action.payload
      });
    case constants.ERROR:
      return Object.assign({}, {
        loading: false,
        data: []
      });
    default:
      return state;
  }
};
