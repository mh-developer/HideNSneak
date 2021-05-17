const unitOfWork = require('../../infra/unit-of-work');

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
  return await unitOfWork.rooms.create(data);
};

const update = async (id, data) => {
  return await unitOfWork.rooms.update(id, data);
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
  remove
};

module.exports = roomsService;
