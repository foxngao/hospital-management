const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const controller = require("./controller");

const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
//  Kiểm tra đầu vào khi tạo phiếu xét nghiệm
const labTestValidator = [
  body("maLoaiXN").notEmpty().withMessage("Mã loại xét nghiệm là bắt buộc"),
  body("ketQua").optional().isString(),
];

/**
 * ROUTES
 * POST    /api/lab-test/         → Bác sĩ hoặc admin tạo mới
 * GET     /api/lab-test/:id      → Bác sĩ, admin, bệnh nhân được xem
 * PUT     /api/lab-test/:id      → Chỉ bác sĩ được cập nhật kết quả
 * DELETE  /api/lab-test/:id      → Chỉ admin được xoá
 */

//  Tạo phiếu xét nghiệm (bác sĩ hoặc admin)
router.post(
  "/",
  verifyToken,
  checkRole("BACSI", "ADMIN"),
  labTestValidator,
  controller.create
);

//  Xem phiếu xét nghiệm
router.get(
  "/:id",
  verifyToken,
  checkRole("ADMIN", "BACSI", "BENHNHAN"),
  controller.getById
);

//  Cập nhật kết quả phiếu – chỉ bác sĩ
router.put(
  "/:id",
  verifyToken,
  checkRole("BACSI"),
  controller.update
);

//  Xóa phiếu xét nghiệm – chỉ admin
router.delete(
  "/:id",
  verifyToken,
  checkRole("ADMIN"),
  controller.remove
);

module.exports = router;
