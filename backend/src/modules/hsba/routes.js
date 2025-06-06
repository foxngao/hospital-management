const express = require("express");
const router = express.Router();
const controller = require("./controller");
const checkRole = require("../../middleware/checkRole");
const verifyToken = require("../../middleware/auth");

router.get("/", verifyToken, checkRole("ADMIN", "BACSI", "NHANSU"), controller.getAll);
router.post("/", verifyToken, checkRole("BACSI", "NHANSU","BENHNHAN"), controller.create);
router.delete("/:id", verifyToken, checkRole("ADMIN", "NHANSU", "BACSI"), controller.remove);
router.post("/benhnhancreate", controller.createByBenhNhan);

// Bệnh nhân xem hồ sơ của chính mình
router.get("/benhnhan/:maBN", controller.getByBenhNhan);
router.get("/hsbabyMaBN/:maHSBA", controller.getByMaBN); // ✅ API lấy hồ sơ theo mã bệnh nhân

module.exports = router;
