const Joi = require('joi');

/**
 * @swagger
 * definitions:
 *   roomDto:
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       lastname:
 *         type: string
 *       email:
 *         type: string
 */
const roomMapper = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  owner: Joi.string().required(),
  maxPlayers: Joi.number().required(),
  currentPlayers: Joi.array().required()
});

module.exports = roomMapper;
