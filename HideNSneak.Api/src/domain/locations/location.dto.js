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
 *       lng:
 *         type: string
 *       lat:
 *         type: string
 *       timestamp:
 *         type: string
 */
const locationDto = Joi.object({
  id: Joi.string(),
  userId: Joi.string(),
  lng: Joi.string().required(),
  lat: Joi.string().required(),
  timestamp: Joi.date().timestamp().required()
});

module.exports = locationDto;
