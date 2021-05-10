const unitOfWork = require("../../infra/unit-of-work");

const getAll = () => {
    // TODO
    // return unitOfWork.User.fetchAll();
};

const get = (id) => {
    // TODO
    // return unitOfWork.User.where({ id: id }).fetch();
};

const create = (data) => {
    // TODO
    // return unitOfWork.User.forge({ ...data, id: null }).save();
};

const update = (id, data) => {
    // TODO
    // return unitOfWork.User.forge({ ...data, id }).save();
};

const remove = (id) => {
    // TODO
    // return unitOfWork.User.forge({ id: id }).destroy();
};

const usersService = {
    getAll,
    get,
    create,
    update,
    remove,
};

module.exports = usersService;
