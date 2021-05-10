const unitOfWork = require("../../infra/unit-of-work");

const getAll = () => {
    // TODO
    // return unitOfWork.Location.fetchAll();
};

const get = (id) => {
    // TODO
    // return unitOfWork.Location.where({ id: id }).fetch();
};

const create = (data) => {
    // TODO
    // return unitOfWork.Location.forge({ ...data, id: null }).save();
};

const update = (id, data) => {
    // TODO
    // return unitOfWork.Location.forge({ ...data, id }).save();
};

const remove = (id) => {
    // TODO
    // return unitOfWork.Location.forge({ id: id }).destroy();
};

const ping = () => {
    // TODO
};

const notify = (id) => {
    // TODO
};

const locationsService = {
    getAll,
    get,
    create,
    update,
    remove,
    ping,
    notify,
};

module.exports = locationsService;
