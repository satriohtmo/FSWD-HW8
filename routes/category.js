const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.getAllCategory);
router.get("/:name", controller.filmByCategory);

module.exports = router;
