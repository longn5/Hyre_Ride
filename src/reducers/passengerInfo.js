import moment from 'moment';
import constants from '../constants/index';

const StartDate = moment().add(24, 'hours');

const initialState = {
  validated: false,
  fields: {
    pDate: StartDate,
    phoneNumber: '',
    pTime: '8:00AM',
    pAddress: '',
    pCity: '',
    pZip: '',
    pState: 'OR',
    dAddress: '',
    dCity: '',
    dZip: '',
    dState: 'OR',
    firstName: '',
    lastName: '',
    email: '',
    costs: false,
    validate: false,
    states: [
      {value: 'OR', display: 'Oregon'}
    ]
  },
  errors: {
    phoneNumber: null,
    pAddress: null,
    pCity: null,
    pZip: null,
    dAddress: null,
    dCity: null,
    dZip: null,
    firstName: null,
    lastName: null,
    email: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_PASSENGER_INFO:
      return Object.assign({},
        state, {
          fields: Object.assign({}, action.payload)
        }
      );
    case constants.CHECK_VALIDATION:
     return Object.assign({},
        state, {
          validated: action.payload
        }
      );
    default:
      return state;
  }
};
