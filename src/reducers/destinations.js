import constants from '../constants/index';

const initialState = {
  data: [],
  destinations: {
    parent: {
      name: null,
      locations: {}
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_PACKAGE:
      return {
        data: []
      };
    case constants.DESTINATION_ADDED:
      return Object.assign({}, state, {
        destinations: Object.assign({}, action.payload)
      });
    case constants.DESTINATIONS_LOADED:
      return Object.assign({}, state, {
        loading: true,
        data: action.payload
      });
    default:
      return state;
  }
};
