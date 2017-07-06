import constants from '../constants/index';

const initialState = {
  totals: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.LOADING:
      return {
        loading: true,
        totals: null
      };
    case constants.TIME_AND_MILES_LOADED:
      return {
        loading: false,
        totals: Object.assign({}, action.payload)
      };
    default:
      return state;
  }
};
