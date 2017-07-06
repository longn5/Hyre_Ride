import constants from '../constants/index';

const initialState = {
  data: null,
  loading: false,
  selectedDriver: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.LOADING:
      return Object.assign({}, state, {
        loading: true,
        data: null
      });
    case constants.DRIVER_LOADED:
      return {
        loading: false,
        data: action.payload
      };
    case constants.DRIVER_SELECTED:
      return Object.assign({}, {
        state,
        selectedDriver: action.payload
      });
    case constants.PASSENGER_INFO:
      return Object.assign({}, {
        state,
        passengerinfo: action.payload
      });
    case constants.ERROR:
      return Object.assign({}, {
        loading: false,
        data: null
      });
    default:
      return state;
  }
};
