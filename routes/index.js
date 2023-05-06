const express = require("express");
const router = express.Router();
const actor = require("./actor");
const category = require("./category");
const film = require("./film");

// router.use("/actors", actor);
router.use("/categories", category);
router.use("/films", film);

module.exports = router;
