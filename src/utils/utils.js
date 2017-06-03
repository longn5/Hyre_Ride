function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

function capitalizeArrayStrings(array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = capitalize(array[i]);
  }

  return array.join(' ');
}

export {
    capitalize, capitalizeArrayStrings
};
