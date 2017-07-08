import constants from '../constants/index';

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

function capitalizeArrayStrings(array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = capitalize(array[i]);
  }

  return array.join(' ');
}

function getHoursFromLocations(locations, lastValueToadd) {
  const hours = Object.values(locations);
  let sum = hours.reduce((previous, current) => {
    return Number(previous) + Number(current);
  }, 0);
  sum += Number(lastValueToadd);

  return sum > constants.TOTAL_TIME_TO_SPEND;
}

export {
    capitalize, capitalizeArrayStrings, getHoursFromLocations
};
