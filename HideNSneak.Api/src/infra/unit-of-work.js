const databaseInstance = require('./db.config');
const locations = require('./repositories/locations.repository');
const users = require('./repositories/users.repository');
const Pusher = require('./pusher');
const pusherInstance = require('./pusher.config');

if (process.env.NODE_ENV === 'production') {
  databaseInstance();
} else if (process.env.NODE_ENV === 'development') {
  databaseInstance(process.env.DB_CONNECTION_STRING);
}

const pusher = Pusher(pusherInstance);

const unitOfWork = {
  locations,
  users,
  pusher
};

module.exports = unitOfWork;
