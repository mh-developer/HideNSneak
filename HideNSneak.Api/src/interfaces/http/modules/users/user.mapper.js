const Joi = require("joi");

/**
 * @swagger
 * definitions:
 *   location:
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
const userMapper = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
});

module.exports = userMapper;
