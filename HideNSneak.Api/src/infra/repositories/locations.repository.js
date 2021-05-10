const { LocationModel } = require("../../domain/index");

const getAll = async () => {
    return await LocationModel.find();
};

const get = async (id) => {
    return await LocationModel.findById(id);
};

const create = async (data) => {
    const newLocation = new LocationModel(data);
    return await newLocation.save();
};

const update = async (id, data) => {
    return await LocationModel.findByIdAndUpdate(id, {
        ...data,
        timestamp: Date.now(),
    });
};

const remove = async (id) => {
    const location = await LocationModel.findById(id);
    await location.deleteOne();
};

const locationsRepository = {
    getAll,
    get,
    create,
    update,
    remove,
};

module.exports = locationsRepository;
