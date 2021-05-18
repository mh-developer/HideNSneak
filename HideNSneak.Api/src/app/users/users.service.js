module.exports = (unitOfWork = require('../../infra/unit-of-work')) => {
  const getAll = async () => {
    return await unitOfWork.users.getAll();
  };

  const get = async id => {
    return await unitOfWork.users.get(id);
  };

  const getByFilter = async filter => {
    return await unitOfWork.users.getByFilter(filter);
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
    getByFilter,
    create,
    update,
    remove
  };

  return usersService;
};
