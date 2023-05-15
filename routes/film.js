const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllerFilm");
const authentication = require("../middlewares/authentication");

router.use(authentication);

router.get("/", controller.getAllFilm);
router.post("/", controller.addNewFilm);
router.get("/:id", controller.filmById);
router.delete("/:id", controller.deleteFilmById);
router.put("/:id", controller.updateFilm);

module.exports = router;
