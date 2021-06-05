const locationToLocationDto = from => {
  return {
    id: from._id,
    userId: from.userId,
    longitude: from.longitude,
    latitude: from.latitude,
    zoom: from.zoom,
    radius: from.radius,
    color: from.color,
    playerRadius: from.playerRadius,
    accuracy: from.accuracy,
    address: from.address,
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
