var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Awyee, API Works!!!');
});

module.exports = router;
