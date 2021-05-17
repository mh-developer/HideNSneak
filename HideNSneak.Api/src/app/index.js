const locationsService = require('./locations/locations.service');
const usersService = require('./users/users.service');
const authService = require('./auth/auth.service');
const roomsService = require('./rooms/rooms.service');

module.exports = {
  locationsService: locationsService(),
  usersService: usersService(),
  authService: authService(),
  roomsService: roomsService()
};
