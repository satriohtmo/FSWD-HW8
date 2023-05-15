const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllerUser");
const authentication = require("../middlewares/authentication");

router.use(authentication);

router.get("/", controller.getUser);

module.exports = router;
