const locationsService = require('./locations/locations.service');
const usersService = require('./users/users.service');
const authService = require('./auth/auth.service');

module.exports = {
  locationsService: locationsService(),
  usersService: usersService(),
  authService: authService()
};
