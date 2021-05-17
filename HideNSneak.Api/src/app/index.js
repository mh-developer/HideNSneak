const locations = require('./locations/locations.service');
const users = require('./users/users.service');
const auth = require('./auth/auth.service');

const authService = auth();
const usersService = users();
const locationsService = locations();

module.exports = {
  locationsService,
  usersService,
  authService
};
