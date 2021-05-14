const { UserModel } = require('../../domain/index');

const getAll = async () => {
  return await UserModel.find();
};

const get = async id => {
  return await UserModel.findById(id);
};

const create = async data => {
  const newUser = new UserModel(data);
  return await newUser.save();
};

const update = async (id, data) => {
  return await UserModel.findByIdAndUpdate(id, {
    ...data,
    updated: Date.now()
  });
};

const remove = async id => {
  const user = await UserModel.findById(id);
  await user.deleteOne();
};

const usersRepository = {
  getAll,
  get,
  create,
  update,
  remove
};

module.exports = usersRepository;
