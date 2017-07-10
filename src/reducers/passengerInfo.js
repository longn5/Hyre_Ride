import moment from 'moment';
import constants from '../constants/index';

const StartDate = moment().add(24, 'hours');

const testFields = {
  pDateTime: StartDate,
  phoneNumber: '9049454597',
  pAddress: '220 N Adair St',
  pCity: 'Cornelius',
  pZip: '97113',
  pState: 'OR',
  dAddress: '220 N Adair St',
  dCity: 'Cornelius',
  dZip: '97113',
  dState: 'OR',
  firstName: 'Test',
  lastName: 'Man',
  email: 'Test.man@gmail.com',
  costs: false,
  validate: null,
  states: [
    {value: 'OR', display: 'Oregon'}
  ]
}

const prodFields = {
  pDateTime: StartDate,
  phoneNumber: '',
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
  validate: null,
  states: [
    {value: 'OR', display: 'Oregon'}
  ]
}

const initialState = {
  validated: null,
  fields: testFields,
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
