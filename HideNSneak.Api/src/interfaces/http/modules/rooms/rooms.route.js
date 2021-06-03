const express = require('express');
const router = express.Router();
const Status = require('http-status');
const roomMapper = require('../../../../domain/rooms/room.mapper');
const roomDto = require('../../../../domain/rooms/room.dto');
const services = require('../../../../app/index');

/**
 * @swagger
 * /api/v1/rooms/:
 *   get:
 *     tags:
 *       - Rooms
 *     description: Get a list of rooms
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
 *             $ref: '#/definitions/roomDto'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.get('/', async (req, res) => {
  try {
    const rooms = await services.roomsService.getAll();
    res
      .status(Status.OK)
      .json(rooms.map(room => roomMapper.roomToRoomDto(room)));
  } catch (error) {
    res.status(Status.BAD_REQUEST).json(error);
  }
});

/**
 * @swagger
 * /api/v1/rooms/join/{joinCode}:
 *   get:
 *     tags:
 *       - Rooms
 *     description: Joins a room
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.get('/join/:code', async (req, res) => {
  try {
    const room = await services.roomsService.join({
      userId: req.user?.id,
      joinCode: req.params.code
    });
    if (room) {
      res.status(Status.OK).json(roomMapper.roomToRoomDto(room));
    } else {
      res.status(Status.NOT_FOUND).json(`Room ${id} not found.`);
    }
  } catch (error) {
    res.status(Status.BAD_REQUEST).json(error);
  }
});

/**
 * @swagger
 * /api/v1/rooms/quit/{joinCode}:
 *   get:
 *     tags:
 *       - Rooms
 *     description: Joins a room
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.get('/quit/:code', async (req, res) => {
  try {
    const room = await services.roomsService.quit({
      userId: req.user?.id,
      joinCode: req.params.code
    });
    if (room) {
      res.status(Status.OK).json(roomMapper.roomToRoomDto(room));
    } else {
      res.status(Status.NOT_FOUND).json(`Room ${id} not found.`);
    }
  } catch (error) {
    res.status(Status.BAD_REQUEST).json(error);
  }
});

/**
 * @swagger
 * /api/v1/rooms/{id}:
 *   get:
 *     tags:
 *       - Rooms
 *     description: Get specific room
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Room's ID
 *         type: string
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/roomDto'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params,
      room = await services.roomsService.get(id);
    if (room) {
      res.status(Status.OK).json(roomMapper.roomToRoomDto(room));
    } else {
      res.status(Status.NOT_FOUND).json(`Room ${id} not found.`);
    }
  } catch (error) {
    res.status(Status.BAD_REQUEST).json(error);
  }
});

/**
 * @swagger
 * /api/v1/rooms/:
 *   post:
 *     tags:
 *       - Rooms
 *     description: Create room
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Room's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/roomDto'
 *     security:
 *       - JWT: []
 *     responses:
 *       201:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/roomDto'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
router.post(
  '/',
  async (req, res, next) => {
    try {
      req.body.owner = req.user.id;
      req.body.currentPlayers = [req.user.id];
      const { error } = await roomDto.validateAsync(req.body);
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
      const room = await services.roomsService.create(
        roomMapper.roomDtoToRoom(req.body)
      );
      res.status(Status.CREATED).json(roomMapper.roomToRoomDto(room));
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(error);
    }
  }
);

/**
 * @swagger
 * /api/v1/rooms/{id}:
 *   put:
 *     tags:
 *       - Rooms
 *     description: Update room
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Room's ID to update
 *         type: string
 *       - name: body
 *         description: Room's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/roomDto'
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
      const { error } = await roomDto.validateAsync(req.body);
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
        room = await services.roomsService.get(id);
      if (room) {
        await services.roomsService.update(
          id,
          roomMapper.roomDtoToRoom(req.body)
        );
        res.status(Status.NO_CONTENT).json();
      } else {
        res.status(Status.NOT_FOUND).json(`Room ${id} not found.`);
      }
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(error);
    }
  }
);

/**
 * @swagger
 * /api/v1/rooms/{id}:
 *   delete:
 *     tags:
 *       - Rooms
 *     description: Delete room
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Room's ID
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
      room = await services.roomsService.get(id);
    if (room) {
      await services.roomsService.remove(id);
      res.status(Status.NO_CONTENT).json();
    } else {
      res.status(Status.NOT_FOUND).json(`Room ${id} not found.`);
    }
  } catch (error) {
    res.status(Status.BAD_REQUEST).json(error);
  }
});

module.exports = router;
