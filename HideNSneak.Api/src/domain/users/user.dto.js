const Joi = require('joi');

/**
 * @swagger
 * definitions:
 *   userDto:
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
const userDto = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().required()
});

module.exports = userDto;
