const Joi = require('joi');

/**
 * @swagger
 * definitions:
 *   loginDto:
 *     properties:
 *       email:
 *         type: string
 *       password
 *         type: string
 */
const loginDto = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = loginDto;
