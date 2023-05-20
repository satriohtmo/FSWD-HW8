const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllerUser");
const upload = require("../middlewares/multer");
const authentication = require("../middlewares/authentication");

router.use(authentication);

router.get("/", controller.getUser);
router.put("/:id", upload.single("photo"), controller.editUser);
router.delete("/:id", upload.single("photo"), controller.deleteUser);

module.exports = router;
