const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllerFilm");
const upload = require("../middlewares/multer");
const authentication = require("../middlewares/authentication");

router.use(authentication);

router.get("/", controller.getAllFilm);
router.post("/", upload.single("photo"), controller.addNewFilm);
router.get("/:id", controller.filmById);
router.delete("/:id", controller.deleteFilmById);
router.put("/:id", controller.updateFilm);

module.exports = router;
