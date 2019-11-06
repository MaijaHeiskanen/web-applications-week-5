var express = require("express");
var router = express.Router();

// Require controllers
var panel_controller = require("../controllers/panelController");

// GET post listing page
router.get("/:id", panel_controller.index);

// POST request for creating a new post
router.post("/:id/save", panel_controller.save);

router.post("/clear", panel_controller.clear);

module.exports = router;
