const { RoomModel } = require('../../domain/index');

const getAll = async () => {
  return await RoomModel.find();
};

const get = async id => {
  return await RoomModel.findById(id);
};

const getByFilter = async filter => {
  return await RoomModel.findOne(filter);
};

const create = async data => {
  const newRoom = new RoomModel(data);
  return await newRoom.save();
};

const update = async (id, data) => {
  return await RoomModel.findByIdAndUpdate(id, {
    ...data,
    updated: Date.now()
  });
};

const remove = async id => {
  const user = await RoomModel.findById(id);
  await user.deleteOne();
};

const roomsRepository = {
  getAll,
  get,
  getByFilter,
  create,
  update,
  remove
};

module.exports = roomsRepository;
