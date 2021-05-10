const Joi = require("joi");

/**
 * @swagger
 * definitions:
 *   location:
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
const locationMapper = Joi.object({
    id: Joi.number(),
    userId: Joi.number(),
    lng: Joi.string().required(),
    lat: Joi.string().required(),
    timestamp: Joi.date().timestamp().required(),
});

module.exports = locationMapper;
