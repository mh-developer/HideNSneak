const health = require('./health/health.route');
const auth = require('./auth/auth.route');
const locations = require('./locations/locations.route');
const users = require('./users/users.route');
const rooms = require('./rooms/rooms.route');

/**
 * @swagger
 * responses:
 *   Unauthorized:
 *     description: Unauthorized
 *   BadRequest:
 *     description: BadRequest / Invalid Input
 */

module.exports = {
  health,
  auth,
  locations,
  users,
  rooms
};
