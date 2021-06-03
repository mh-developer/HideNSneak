const locationToLocationDto = from => {
  return {
    id: from._id,
    userId: from.userId,
    lng: from.lng,
    lat: from.lat,
    timestamp: from.timestamp
  };
};

const locationDtoToLocation = from => {
  return {
    _id: from.id,
    ...from
  };
};

module.exports = {
  locationToLocationDto,
  locationDtoToLocation
};
