const Joi = require('joi');

/**
 * @swagger
 * definitions:
 *   registerDto:
 *     properties:
 *       name:
 *         type: string
 *       lastname:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */
const loginDto = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = loginDto;
