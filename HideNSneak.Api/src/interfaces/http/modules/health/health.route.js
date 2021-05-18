const express = require('express');
const router = express.Router();
const Status = require('http-status');

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     tags:
 *       - Status
 *     description: Returns API status
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: API Status
 *       500:
 *         description: Internal Server Error
 */
router.get('/', (req, res) => {
  res.status(Status.OK).json({ status: 'Awyee, API Works!!!' });
});

module.exports = router;
