const express = require('express');
const router = express.Router();
const Status = require('http-status');
const userMapper = require('./user.mapper');
const services = require('../../../../app/index');

/**
 * @swagger
 * /api/v1/users/:
 *   get:
 *     tags:
 *       - Users
 *     description: Get a list of users
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
  try {
    const users = await services.usersService.getAll();
    res.status(Status.OK).json(users);
  } catch (error) {
    res.status(Status.BAD_REQUEST).json(error);
  }
});

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Get specific user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User's ID
 *         type: string
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/userDto'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params,
      user = await services.usersService.get(id);
    if (user) {
      res.status(Status.OK).json(user);
    } else {
      res.status(Status.NOT_FOUND).json(`User ${id} not found.`);
    }
  } catch (error) {
    res.status(Status.BAD_REQUEST).json(error);
  }
});

/**
 * @swagger
 * /api/v1/users/:
 *   post:
 *     tags:
 *       - Users
 *     description: Create user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: User's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/userDto'
 *     security:
 *       - JWT: []
 *     responses:
 *       201:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/userDto'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.post(
  '/',
  async (req, res, next) => {
    try {
      const { error } = await userMapper.validateAsync(req.body);
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
    try {
      const user = await services.usersService.create(req.body);
      res.status(Status.CREATED).json(user);
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(error);
    }
  }
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: Update user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User's ID to update
 *         type: string
 *       - name: body
 *         description: User's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/userDto'
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
    try {
      const { error } = await userMapper.validateAsync(req.body);
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
    try {
      const { id } = req.params,
        user = await services.usersService.get(id);
      if (user) {
        await services.usersService.update(id, req.body);
        res.status(Status.NO_CONTENT).json();
      } else {
        res.status(Status.NOT_FOUND).json(`User ${id} not found.`);
      }
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(error);
    }
  }
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Delete user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User's ID
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
  try {
    const { id } = req.params,
      user = await services.usersService.get(id);
    if (user) {
      await services.usersService.remove(id);
      res.status(Status.NO_CONTENT).json();
    } else {
      res.status(Status.NOT_FOUND).json(`User ${id} not found.`);
    }
  } catch (error) {
    res.status(Status.BAD_REQUEST).json(error);
  }
});

module.exports = router;
