var express = require('express');
var router = express.Router();
var user = require('../models/project');
var project = require('../server/project.controller');

/* GET home page. */
router.get('/', project.index);
router.post('/', project.create);

module.exports = router;
