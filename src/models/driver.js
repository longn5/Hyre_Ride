function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

function capitalizeArrayStrings (array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = capitalize(array[i]);
  }

  return array.join(' ');
}

function getStringChunks(str, cunkSize) {
  const stringChunks = [];
  for (let i = 0, charsLength = str.length; i < charsLength; i += cunkSize) {
    stringChunks.push(str.substring(i, i + cunkSize));
  }
  return stringChunks;
}

const Driver = (data) => {
  let areaServed = data.packages.split(',');
  areaServed = areaServed.map((value) => {
    return {
      value,
      displayValue: capitalizeArrayStrings(value.split('_'))
    };
  });

  const driverData = {
    name: data.name,
    photoURL: data.profilePicture,
    id: data.id,
    carImages: data.carimages,
    rate: data.rate,
    capacity: data.capacity,
    areaServed,
    vehicle: `${capitalize(data.vmake)}, ${capitalize(data.vmodel)}, ${data.vyear}`,
    fullDescription: data.bio,
    shortDescription: getStringChunks(data.bio, 200)[0].trim()
  };

  return driverData;
};

export default Driver;
