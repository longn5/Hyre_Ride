import actionType from '../constants/index';

const getInfoFromGoogle = () => (dispatch, getState) => {
  dispatch({
    type: actionType.LOADING,
    payload: []
  });
  const origin = getState().passengerInfo.fields.pAddress;
  const destination = getState().passengerInfo.fields.dAddress;
  const locations = Object.values(getState().destinations.visitingLocations.parent.locations);

  const waypoints = locations.map((value) => {
    const data = value.split('++');
    return {
      location: data[1],
      stopover: true
    };
  });
  const directionsService = new window.google.maps.DirectionsService();
  const googleMapTest = {
    origin,
    destination,
    waypoints,
    provideRouteAlternatives: false,
    travelMode: 'DRIVING',
    optimizeWaypoints: true,
    drivingOptions: {
      departureTime: new Date(),
      trafficModel: 'pessimistic'
    }
  };

  directionsService.route(googleMapTest, (result, status) => {
    if (status === 'OK') {
      console.log(result)
      const data = result.routes[0].legs;
      let totalDistance = 0;
      let totalDuration = 0;
      const miles = 0.000621371;

      for (let i = 0; i < data.length; ++i) {
        totalDistance += data[i].distance.value;
        totalDuration += data[i].duration.value;
      }

      dispatch({
        type: actionType.TIME_AND_MILES_LOADED,
        payload: {
          totalDistanceMiles: Math.ceil(totalDistance * miles),
          totalDurationMinutes: Math.ceil(totalDuration / 60)
        }
      });
    }
  });
};

export {
  getInfoFromGoogle
};
