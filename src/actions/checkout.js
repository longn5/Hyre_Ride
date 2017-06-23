import actionType from '../constants/index';

const getInfoFromGoogle = () => (dispatch, getState) => {
  const origin = getState().passengerInfo.fields.pAddress;
  const destination = getState().passengerInfo.fields.dAddress;

  
  console.log(getState())
//     const directionsService = new window.google.maps.DirectionsService();
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

// directionsService.route(googleMapTest, function(result, status) {
//   if (status === 'OK') {
//     console.log(result);
//   }
// });

//   }

};

export {
  getInfoFromGoogle
};
