import constants from '../constants/index';

const initialState = {
  data: [],
  visitingLocations: {
    parent: {
      name: null,
      locations: {}
    }
  },
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.DESTINATION_ADDED:
      return Object.assign({}, state, {
        visitingLocations: Object.assign({}, action.payload),
        error: null
      });
    case constants.DESTINATIONS_LOADED:
      return Object.assign({}, state, {
        loading: false,
        data: action.payload,
        error: null
      });
    case constants.ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });
    default:
      return state;
  }
};
