const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllerActor");

router.get("/", controller.getActor);

module.exports = router;
