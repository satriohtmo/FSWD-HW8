const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.getAllFilm);
router.get("/:id", controller.filmById);

module.exports = router;
