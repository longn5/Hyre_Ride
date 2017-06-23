import moment from 'moment';
import constants from '../constants/index';

const StartDate = moment().add(24, 'hours');

const initialState = {
  validated: false,
  fields: {
    pDate: StartDate,
    phoneNumber: '9049454597',
    pTime: '8:00AM',
    pAddress: '5671 sw remington dr',
    pCity: 'beaverton',
    pZip: '97007',
    pState: 'OR',
    dAddress: '5671 sw remington dr',
    dCity: 'beaverton',
    dZip: '97007',
    dState: 'OR',
    firstName: 'sudesh',
    lastName: 'banskota',
    email: 'sudesh.banskota@gmail.com',
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
