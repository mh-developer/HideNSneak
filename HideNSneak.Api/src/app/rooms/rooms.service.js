module.exports = (unitOfWork = require('../../infra/unit-of-work')) => {
  const getAll = async () => {
    return await unitOfWork.rooms.getAll();
  };

  const get = async id => {
    return await unitOfWork.rooms.get(id);
  };

  const getByFilter = async filter => {
    return await unitOfWork.rooms.getByFilter(filter);
  };

  const create = async data => {
    data.joinCode = (+new Date()).toString(36).slice(-4);
    return await unitOfWork.rooms.create(data);
  };

  const update = async (id, data) => {
    return await unitOfWork.rooms.update(id, data);
  };

  const join = async data => {
    const room = await getByFilter({ joinCode: data.joinCode });

    if (room.currentPlayers.indexOf(data.userId) === -1) {
      room.currentPlayers.push(data.userId);
    } else {
      return room;
    }
    room.save();
    return room;
  };

  const quit = async data => {
    const room = await getByFilter({ joinCode: data.joinCode });

    if (room.currentPlayers.indexOf(data.userId) !== -1) {
      room.currentPlayers.splice(room.currentPlayers.indexOf(data.userId), 1);
    } else {
      return room;
    }
    room.save();
    return room;
  };

  const remove = async id => {
    return await unitOfWork.rooms.remove(id);
  };

  const roomsService = {
    getAll,
    get,
    getByFilter,
    create,
    update,
    remove,
    join,
    quit
  };

  return roomsService;
};
