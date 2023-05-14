const express = require("express");
const controllerUser = require("../controllers/controllerUser");
const router = express.Router();
const actor = require("./actor");
const category = require("./category");
const film = require("./film");
const authentication = require("../middlewares/authentication");

router.post("/login", controllerUser.login);
// router.use(authentication);
router.use("/actors", actor);
router.use("/categories", category);
router.use("/films", film);

module.exports = router;
