const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const controller = require("./controller");
const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");

// Middleware kiểm tra dữ liệu đầu vào khi tạo lịch hẹn
const appointmentValidator = [
  body("maBS").notEmpty().withMessage("Mã bác sĩ là bắt buộc"),
  body("maCa").notEmpty().withMessage("Mã ca khám là bắt buộc"),
  body("ngayHen").isISO8601().withMessage("Ngày hẹn không hợp lệ"),
  body("ghiChu").optional().isString(),
];

/**
 * ROUTES
 * GET     /api/appointment            => getAll
 * GET     /api/appointment/:id        => getById
 * POST    /api/appointment            => create
 * PUT     /api/appointment/:id        => update
 * DELETE  /api/appointment/:id        => remove
 */

//  Lấy danh sách lịch hẹn – theo quyền
router.get(
  "/",
  verifyToken,
  checkRole("ADMIN", "BACSI", "BENHNHAN"),
  controller.getAll
);

//  Xem chi tiết lịch hẹn
router.get(
  "/:id",
  verifyToken,
  checkRole("ADMIN", "BACSI", "BENHNHAN"),
  controller.getById
);

//  Tạo mới lịch hẹn – chỉ BỆNH NHÂN hoặc ADMIN
router.post(
  "/",
  verifyToken,
  checkRole("BENHNHAN", "ADMIN"),
  appointmentValidator,
  controller.create
);

//  Cập nhật lịch hẹn – chỉ BÁC SĨ hoặc ADMIN
router.put(
  "/:id",
  verifyToken,
  checkRole("BACSI", "ADMIN"),
  controller.update
);

//  Xóa lịch hẹn – chỉ ADMIN
router.delete(
  "/:id",
  verifyToken,
  checkRole("ADMIN"),
  controller.remove
);

module.exports = router;
