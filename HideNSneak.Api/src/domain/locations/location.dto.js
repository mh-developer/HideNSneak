const Joi = require('joi');

/**
 * @swagger
 * definitions:
 *   locationDto:
 *     properties:
 *       id:
 *         type: string
 *       userId:
 *         type: string
 *       longitude:
 *         type: number
 *       latitude:
 *         type: number
 *       zoom:
 *         type: number
 *       radius:
 *         type: number
 *       color:
 *         type: object
 *       playerRadius:
 *         type: number
 *       accuracy:
 *         type: number
 *       address:
 *         type: string
 *       timestamp:
 *         type: string
 */
const locationDto = Joi.object({
  id: Joi.string(),
  userId: Joi.string(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
  zoom: Joi.number(),
  radius: Joi.number(),
  color: Joi.object(),
  playerRadius: Joi.number(),
  accuracy: Joi.number(),
  address: Joi.string(),
  timestamp: Joi.date().timestamp()
});

module.exports = locationDto;
