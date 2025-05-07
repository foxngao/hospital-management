const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { body } = require("express-validator");

const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");

//  Validator cho tạo hóa đơn
const billValidator = [
  body("maBN").notEmpty().withMessage("Mã bệnh nhân là bắt buộc"),
  body("tongTien")
    .isFloat({ min: 0 })
    .withMessage("Tổng tiền phải là số >= 0"),
  body("trangThai")
    .optional()
    .isIn(["chua_thanh_toan", "da_thanh_toan"])
    .withMessage("Trạng thái không hợp lệ"),
];

/**
 * ROUTES
 * POST    /api/billing/                → Tạo hóa đơn (ADMIN)
 * GET     /api/billing/:id             → Xem 1 hóa đơn (ADMIN, BACSI)
 * GET     /api/billing/benh-nhan/:id   → Xem hóa đơn bệnh nhân (BENHNHAN chỉ xem của mình)
 * PUT     /api/billing/:id             → Cập nhật hóa đơn (ADMIN)
 * DELETE  /api/billing/:id             → Xoá hóa đơn (ADMIN)
 */

router.post(
  "/",
  verifyToken,
  checkRole("ADMIN"),
  billValidator,
  controller.create
);

router.get(
  "/:id",
  verifyToken,
  checkRole("ADMIN", "BACSI"),
  controller.getById
);

router.get(
  "/benh-nhan/:id",
  verifyToken,
  checkRole("ADMIN", "BACSI", "BENHNHAN"),
  controller.getByBENHNHAN
);

router.put(
  "/:id",
  verifyToken,
  checkRole("ADMIN"),
  billValidator,
  controller.update
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("ADMIN"),
  controller.remove
);

module.exports = router;
