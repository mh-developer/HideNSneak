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
  maxPlayers: Joi.number().required()
});

module.exports = roomMapper;
