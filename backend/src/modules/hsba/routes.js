const express = require("express");
const router = express.Router();
const controller = require("./controller");
const checkRole = require("../../middleware/checkRole");
const verifyToken = require("../../middleware/auth");

router.get("/", verifyToken, checkRole("ADMIN", "BACSI"), controller.getAll);
router.post("/", verifyToken, checkRole("BACSI"), controller.create);
router.delete("/:id", verifyToken, checkRole("ADMIN"), controller.remove);

// Bệnh nhân xem hồ sơ của chính mình
router.get("/benhnhan/:maBN", verifyToken, checkRole("BENHNHAN"), controller.getByBenhNhan);

module.exports = router;
