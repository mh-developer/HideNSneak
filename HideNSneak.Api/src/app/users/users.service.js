const unitOfWork = require('../../infra/unit-of-work');

const getAll = async () => {
  return await unitOfWork.users.getAll();
};

const get = async id => {
  return await unitOfWork.users.get(id);
};

const create = async data => {
  return await unitOfWork.users.create(data);
};

const update = async (id, data) => {
  return await unitOfWork.users.update(id, data);
};

const remove = async id => {
  return await unitOfWork.users.remove(id);
};

const usersService = {
  getAll,
  get,
  create,
  update,
  remove
};

module.exports = usersService;
