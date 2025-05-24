const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getAll);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

router.get("/tk/:maTK", controller.getByMaTK);


module.exports = router;
