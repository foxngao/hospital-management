const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { body } = require("express-validator");

const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");

//  Kiểm tra đầu vào tạo/cập nhật hồ sơ
const recordValidator = [
  body("maBN").notEmpty().withMessage("Mã bệnh nhân là bắt buộc"),
  body("dotKhamBenh").isISO8601().withMessage("Ngày khám không hợp lệ"),
  body("lichSuBenh").notEmpty().withMessage("Lịch sử bệnh là bắt buộc"),
  body("ghiChu").optional().isString(),
];

/**
 * ROUTES
 * GET     /api/medical-record/            → 'ADMIN', `BACSI` xem tất cả hoặc lọc theo `maBN`
 * GET     /api/medical-record/:id         → 'ADMIN', `BACSI`, `BENHNHAN` (chỉ xem của mình)
 * POST    /api/medical-record/            → `BACSI` tạo mới
 * PUT     /api/medical-record/:id         → `BACSI` cập nhật
 * DELETE  /api/medical-record/:id         → `ADMIN` xoá
 */

//  Lấy danh sách hồ sơ (có thể lọc theo maBN)
router.get(
  "/",
  verifyToken,
  checkRole("ADMIN", "BACSI"),
  controller.getAll
);

//  Xem chi tiết hồ sơ bệnh án
router.get(
  "/:id",
  verifyToken,
  checkRole("ADMIN", "BACSI", "BENHNHAN"),
  controller.getById
);

//  Tạo mới hồ sơ bệnh án
router.post(
  "/",
  verifyToken,
  checkRole("BACSI"),
  recordValidator,
  controller.create
);

//  Cập nhật hồ sơ bệnh án
router.put(
  "/:id",
  verifyToken,
  checkRole("BACSI"),
  recordValidator,
  controller.update
);

//  Xóa hồ sơ bệnh án
router.delete(
  "/:id",
  verifyToken,
  checkRole("ADMIN"),
  controller.remove
);

module.exports = router;
