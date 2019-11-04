var express = require('express');
var router = express.Router();

// Require controllers
var post_controller = require('../controllers/postController');

// GET post listing page
router.get('/', post_controller.index);

// POST request for creating a new post
router.post('/create', post_controller.create);

module.exports = router;
