module.exports = (unitOfWork = require('../../infra/unit-of-work')) => {
  const getAll = async () => {
    return await unitOfWork.locations.getAll();
  };

  const get = async id => {
    return await unitOfWork.locations.get(id);
  };

  const create = async data => {
    return await unitOfWork.locations.create(data);
  };

  const update = async (id, data) => {
    return await unitOfWork.locations.update(id, data);
  };

  const remove = async id => {
    return await unitOfWork.locations.remove(id);
  };

  const ping = async data => {
    return await unitOfWork.pusher.ping(data);
  };

  const notify = async data => {
    return await unitOfWork.pusher.notify(data);
  };

  const locationsService = {
    getAll,
    get,
    create,
    update,
    remove,
    ping,
    notify
  };

  return locationsService;
};
