const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const Status = require('http-status');
const locationMapper = require('./location.mapper');
const services = require('../../../../app/index');

// TODO: move this logic to service layer
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

/**
 * @swagger
 * /api/v1/locations/ping:
 *   post:
 *     tags:
 *       - Locations
 *     description: Report new location
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Report new location
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/locationDto'
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.post('/ping', (req, res) => {
  // TODO
  const { lat, lng } = req.body;
  const data = {
    lat,
    lng
  };
  pusher.trigger('location', 'ping', data);
  res.status(Status.OK).json(data);
});

/**
 * @swagger
 * /api/v1/locations/notify:
 *   post:
 *     tags:
 *       - Locations
 *     description: Notify clients
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/locationDto'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.post('/notify', (req, res) => {
  // TODO
  const { lat, lng } = req.body;
  const data = {
    lat,
    lng
  };
  pusher.trigger('geofence', 'exit', data);
  res.status(Status.OK).json(data);
});

/**
 * @swagger
 * /api/v1/locations/:
 *   get:
 *     tags:
 *       - Locations
 *     description: Get a list of teammates locations
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/userDto'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.get('/', async (req, res) => {
  // TODO
  try {
    const locations = await services.locationsService.getAll();
    res.status(Status.OK).json(locations);
  } catch (error) {
    res.status(Status.BAD_REQUEST).json(error);
  }
});

/**
 * @swagger
 * /api/v1/locations/{id}:
 *   get:
 *     tags:
 *       - Locations
 *     description: Get specific location
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Location's ID
 *         type: string
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/locationDto'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.get('/:id', async (req, res) => {
  // TODO
  try {
    const { id } = req.params,
      location = await services.locationsService.get(id);
    if (location) {
      res.status(Status.OK).json(location);
    } else {
      res.status(Status.NOT_FOUND).json(`Location ${id} not found.`);
    }
  } catch (error) {
    res.status(Status.BAD_REQUEST).json(error);
  }
});

/**
 * @swagger
 * /api/v1/locations/:
 *   post:
 *     tags:
 *       - Locations
 *     description: Create new location
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Location's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/location'
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/locationDto'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.post(
  '/',
  async (req, res, next) => {
    // TODO
    try {
      const { error } = await locationMapper.validateAsync(req.body);
      if (error) {
        res.status(Status.BAD_REQUEST).json('Model validation error');
      } else {
        next();
      }
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(error);
    }
  },
  async (req, res) => {
    // TODO
    try {
      const location = await services.locationsService.create(req.body);
      res.status(Status.CREATED).json(location);
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(error);
    }
  }
);

/**
 * @swagger
 * /api/v1/locations/{id}:
 *   put:
 *     tags:
 *       - Locations
 *     description: Update location
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Location's ID to update
 *         type: string
 *       - name: body
 *         description: Location's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/locationDto'
 *     security:
 *       - JWT: []
 *     responses:
 *       204:
 *         description: Success
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.put(
  '/:id',
  async (req, res, next) => {
    // TODO
    try {
      const { error } = await locationMapper.validateAsync(req.body);
      if (error) {
        res.status(Status.BAD_REQUEST).json('Model validation error');
      } else if (req.params.id != req.body.id) {
        res
          .status(Status.BAD_REQUEST)
          .json('Model validation error. ID arguments not same.');
      } else {
        next();
      }
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(error);
    }
  },
  async (req, res) => {
    // TODO
    try {
      const { id } = req.params,
        location = await services.locationsService.get(id);
      if (location) {
        await services.locationsService.update(id, req.body);
        res.status(Status.NO_CONTENT).json();
      } else {
        res.status(Status.NOT_FOUND).json(`Location ${id} not found.`);
      }
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(error);
    }
  }
);

/**
 * @swagger
 * /api/v1/locations/{id}:
 *   delete:
 *     tags:
 *       - Locations
 *     description: Delete location
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Location's ID
 *         type: string
 *     security:
 *       - JWT: []
 *     responses:
 *       204:
 *         description: Success
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.delete('/:id', async (req, res) => {
  // TODO
  try {
    const { id } = req.params,
      location = await services.locationsService.get(id);
    if (location) {
      await services.locationsService.remove(id);
      res.status(Status.NO_CONTENT).json();
    } else {
      res.status(Status.NOT_FOUND).json(`Location ${id} not found.`);
    }
  } catch (error) {
    res.status(Status.BAD_REQUEST).json(error);
  }
});

module.exports = router;
