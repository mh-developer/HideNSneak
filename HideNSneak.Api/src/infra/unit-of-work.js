const Pusher = require('./pusher');
const pusherInstance = require('./config/pusher.config');
const databaseInstance = require('./config/db.config');
const locations = require('./repositories/locations.repository');
const users = require('./repositories/users.repository');
const rooms = require('./repositories/rooms.repository');

if (process.env.NODE_ENV === 'production') {
  databaseInstance();
} else if (process.env.NODE_ENV === 'development') {
  databaseInstance(process.env.DB_CONNECTION_STRING_DEV);
}

const pusher = Pusher(pusherInstance);

const unitOfWork = {
  locations,
  users,
  pusher,
  rooms
};

module.exports = unitOfWork;
