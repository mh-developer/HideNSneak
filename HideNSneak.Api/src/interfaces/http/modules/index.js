const health = require('./health/health.route');
const auth = require('./auth/auth.route');
const locations = require('./locations/locations.route');
const users = require('./users/users.route');

module.exports = {
  health,
  auth,
  locations,
  users
};
