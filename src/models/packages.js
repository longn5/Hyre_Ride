import {capitalizeArrayStrings} from '../utils/utils';

const Package = (data) => {
  const PackageData = {
    rawValue: data.name,
    name: capitalizeArrayStrings(data.name.split('_')),
    description: data.description,
    website: data.website,
    picture: data.picture
  };

  return PackageData;
};

export default Package;
