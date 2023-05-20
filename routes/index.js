const express = require("express");
const controllerUser = require("../controllers/controllerUser");
const router = express.Router();
const actor = require("./actor");
const category = require("./category");
const film = require("./film");
const user = require("./user");
const authentication = require("../middlewares/authentication");

router.post("/register", controllerUser.register);
router.post("/login", controllerUser.login);

router.use("/assets", express.static("assets"));
router.use("/actors", actor);
router.use("/categories", category);
router.use("/films", film);
router.use("/users", user);

module.exports = router;
