const express = require('express');
const router = express.Router();
const Status = require('http-status');
const passport = require('passport');
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
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      console.log(user, err, info);
      if (err || !user) {
        return res
          .status(Status.BAD_REQUEST)
          .json('Wrong username or password.');
      }

      req.login(user, { session: false }, async error => {
        if (error)
          return res
            .status(Status.BAD_REQUEST)
            .json('Wrong username or password.');

        const result = await services.authService.login(user);

        if (result) {
          res.status(Status.OK).json(result);
        } else {
          res.status(Status.BAD_REQUEST).json('Wrong username or password.');
        }
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
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
router.post(
  '/register',
  passport.authenticate('register', { session: false }),
  async (req, res) => {
    try {
      const result = await services.authService.login(req.user);
      res.status(Status.OK).json({
        user: req.user,
        token: result
      });
    } catch (error) {
      res.status(Status.BAD_REQUEST).json();
    }
  }
);

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
router.post('/token', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(Status.UNAUTHORIZED).json();
    }

    const result = await services.authService.refreshToken(req.user, token);
    if (result) {
      res.status(Status.OK).json(result);
    } else {
      res.status(Status.BAD_REQUEST).json();
    }
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
router.post('/logout', async (req, res) => {
  try {
    const { token } = req.body;
    const result = await services.authService.logout(token);
    if (result) {
      req.logout();
      res.status(Status.OK).json();
    } else {
      res.status(Status.BAD_REQUEST).json();
    }
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
