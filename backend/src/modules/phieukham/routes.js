// ROUTES: Định tuyến API cho phiếu khám của bác sĩ
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getAll);                     // Lấy tất cả phiếu khám
router.get("/bacsi/:maBS", controller.getByBacSi);      // Lấy theo bác sĩ
router.post("/", controller.create);                    // Tạo mới
router.put("/:id", controller.update);                  // Cập nhật
router.delete("/:id", controller.remove);               // Xoá
router.get("/:maPK", controller.getByPK);           // Lấy theo mã phiếu khám

module.exports = router;
