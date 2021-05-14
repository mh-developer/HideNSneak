const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Status = require('http-status');
const services = require('../../../../app/index');

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Login in user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success login
 *       400:
 *         description: Bad Request
 */
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    const result = services.authService.login(username, password);

    if (result) {
      res.status(Status.OK).json(result);
    } else {
      res.status(Status.BAD_REQUEST).send('Username or password incorrect');
    }
  } catch (e) {
    res.status(Status.BAD_REQUEST).send('Username or password incorrect');
  }
});

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Register user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.post('/register', (req, res) => {
  // TODO
  try {
    const data = req.body;
    const result = services.authService.register(data);
    res.status(Status.OK).json(result);
  } catch (error) {
    res.status(Status.BAD_REQUEST).json();
  }
});

/**
 * @swagger
 * /api/v1/auth/token:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Refresh token
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.post('/token', (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(Status.UNAUTHORIZED).json();
    }

    if (!refreshTokens.includes(token)) {
      return res.status(Status.FORBIDDEN).json();
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
      if (err) {
        return res.status(Status.FORBIDDEN).json();
      }

      const result = services.authService.refreshToken(token);

      res.status(Status.OK).json(result);
    });
  } catch (e) {
    res.status(Status.BAD_REQUEST).json();
  }
});

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Logout user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success logout
 *       400:
 *         description: Bad Request
 */
router.post('/logout', (req, res) => {
  try {
    const { token } = req.body;
    const result = services.authService.logout(token);

    res.status(Status.OK).send('Logout successful');
  } catch (e) {
    res.status(Status.BAD_REQUEST).json();
  }
});

/**
 * @swagger
 * definitions:
 *   auth:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   refreshToken:
 *     properties:
 *       token:
 *         type: string
 */

module.exports = router;
