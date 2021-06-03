const roomToRoomDto = from => {
  return {
    id: from._id,
    name: from.name,
    owner: from.owner,
    joinCode: from.joinCode,
    maxPlayers: from.maxPlayers,
    currentPlayers: from.currentPlayers
  };
};

const roomDtoToRoom = from => {
  return {
    _id: from.id,
    ...from
  };
};

module.exports = {
  roomToRoomDto,
  roomDtoToRoom
};
