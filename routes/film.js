const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllerFilm");

router.get("/", controller.getAllFilm);
router.post("/", controller.addNewFilm);
router.get("/:id", controller.filmById);
router.delete("/:id", controller.deleteFilmById);
router.patch("/:id", controller.updateFilm);

module.exports = router;
