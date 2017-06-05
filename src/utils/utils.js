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
    return previous + current;
  }, 0);

  sum += parseInt(lastValueToadd, 10);

  return sum > 5;
}

export {
    capitalize, capitalizeArrayStrings, getHoursFromLocations
};
