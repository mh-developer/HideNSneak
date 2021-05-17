const dbConnection = require('./db.config');
const locations = require('./repositories/locations.repository');
const users = require('./repositories/users.repository');
const rooms = require('./repositories/rooms.repository');
const Pusher = require('./pusher');
const pusherInstance = require('./pusher.config');

dbConnection();

const pusher = Pusher(pusherInstance);

const unitOfWork = {
  locations,
  users,
  pusher,
  rooms
};

module.exports = unitOfWork;
