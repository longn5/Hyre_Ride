const Destination = (data) => {
  const DestinationData = {
    name: data.name,
    description: data.description,
    address: data.address,
    timetospend: data.timetospend,
    website: data.website,
    image: data.image,
    package: data.package
  };

  return DestinationData;
};

export default Destination;
