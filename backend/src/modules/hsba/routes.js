const express = require("express");
const router = express.Router();
const controller = require("./controller");
const checkRole = require("../../middleware/checkRole");
const verifyToken = require("../../middleware/auth");

router.get("/", verifyToken, checkRole("ADMIN", "BACSI", "NHANSU"), controller.getAll);
router.post("/", verifyToken, checkRole("BACSI", "NHANSU"), controller.create);
router.delete("/:id", verifyToken, checkRole("ADMIN", "NHANSU"), controller.remove);

// Bệnh nhân xem hồ sơ của chính mình
router.get("/benhnhan/:maBN", verifyToken, checkRole("BENHNHAN"), controller.getByBenhNhan);

module.exports = router;
