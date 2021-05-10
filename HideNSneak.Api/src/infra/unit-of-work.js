const dbConnection = require("./db.config");
const locations = require("./repositories/locations.repository");
const users = require("./repositories/users.repository");

dbConnection();

const unitOfWork = {
    locations,
    users,
};

module.exports = unitOfWork;
