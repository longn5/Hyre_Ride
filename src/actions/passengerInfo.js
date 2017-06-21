import actionType from '../constants/index';

const noError = {errorMessage: null};

const errorString = 'You should enter a valid';

const errorLabels = {
    phoneNumber: `${errorString} Phone Number`,
    pAddress: `${errorString} Pickup Address`,
    pCity: `${errorString} Pickup City`,
    pZip: `${errorString} Pickup Zip`,
    dAddress: `${errorString} Dropoff Address`,
    dCity: `${errorString} Dropoff City`,
    dZip: `${errorString} Dropoff Zip`,
    firstName: `${errorString} First Name`,
    lastName: `${errorString} Last Name`,
    email: `${errorString} Email`
}

function validateEmail(email) {
  if (!email) return false;
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePhoneNumber(number) {
  if (!number) return false;
  let matchNumbers = number.match(/\d/g);
  if (!matchNumbers) return false;

  return matchNumbers.length === 10;
}

function validateZip(zip) {
    if (!zip) return false;

  let matchNumbers = zip.match(/\d/g);
  if (!matchNumbers) return false;

  return matchNumbers.length === 5;
}

const validatations = {
  email: (value) => {
    if (!validateEmail(value)) {
      return {errorMessage: 'You need to enter a valid email address'};
    }
    return {errorMessage: null};
  },
  phoneNumber: (value) => {
    if (!validatePhoneNumber(value)) {
      return {errorMessage: 'You need to enter a valid phone number'};
    }
    return noError;
  },
  pZip: (value) => {
    if (!validateZip(value)) {
      return {errorMessage: 'You need to enter a valid Pickup zip'};
    }
    return noError;
  },
  dZip: (value) => {
    if (!validateZip(value)) {
      return {errorMessage: 'You need to enter a valid Dropoff zip'};
    }
    return noError;
  },
  default: (value, key) => {
    if (!value) {
      return {errorMessage: errorLabels[key]};
    }
    return noError;
  }
};

const savePassengerInfo = ({id, value}) => (dispatch, getState) => {
  const passengerFields = getState().passengerInfo.fields;
  passengerFields[id] = value;
  dispatch({
    type: actionType.ADD_PASSENGER_INFO,
    payload: passengerFields
  });
};

const resetValidation = () => (dispatch) => {
  dispatch({
    type: actionType.CHECK_VALIDATION,
    payload: false
  });
};

const validateAndSubmit = () => (dispatch, getState) => {
  const passengerInfo = getState().passengerInfo;
  Object.keys(passengerInfo.fields).forEach((key) => {
    if (validatations[key]) {
      const validate = validatations[key](passengerInfo.fields[key]);
      passengerInfo.errors[key] = validate.errorMessage || null;
    } else {
      const validate = validatations.default(passengerInfo.fields[key], key);
      passengerInfo.errors[key] = validate.errorMessage || null;
    }
  });

  let infoToValidate = Object.values(passengerInfo.errors);
  console.log('infoTovalidate', infoToValidate);
  let infoValidated = true;
  for (let i = 0; i < infoToValidate.length; i++) {
      if (infoToValidate[i]) {
        infoValidated = false;
      }
  }

  dispatch({
    type: actionType.CHECK_VALIDATION,
    payload: infoValidated
  });
};

export {
  savePassengerInfo,
  validateAndSubmit,
  resetValidation
};

//
//
// saveInfo = () => {
//     var directionsService = new window.google.maps.DirectionsService();
//     const googleMapTest = {
//       origin: '5671 SW remington Dr, Beaverton, OR, 97007',
//       destination: '5671 SW remington Dr, Beaverton, OR, 97007',
//       waypoints: [
//         {
//           location: '35040 Southwest Unger Road, Cornelius, OR 97113',
//           stopover: true
//         }
//       ],
//       provideRouteAlternatives: false,
//       travelMode: 'DRIVING',
//       optimizeWaypoints: true,
//       drivingOptions: {
//         departureTime: new Date(),
//         trafficModel: 'pessimistic'
//       }
// };
//
// directionsService.route(googleMapTest, function(result, status) {
//   if (status === 'OK') {
//     console.log(result);
//   }
// });
//
//   }
