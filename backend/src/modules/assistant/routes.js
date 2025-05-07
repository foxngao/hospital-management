const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const controller = require("./controller");

const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");

//  Validator kiểm tra đầu vào
const assistantValidator = [
  body("maNS").notEmpty().withMessage("Thiếu mã nhân sự"),
  body("maBacSi").notEmpty().withMessage("Thiếu mã bác sĩ"),
  body("phamViUyQuyen").optional().isString(),
];

/**
 * ROUTES
 * GET     /api/assistant           → ADMIN xem tất cả, BACSI xem trợ lý của mình
 * POST    /api/assistant           → ADMIN thêm trợ lý
 * PUT     /api/assistant/:maTroLy  → ADMIN cập nhật
 * DELETE  /api/assistant/:maTroLy  → ADMIN xoá
 */

//  Xem danh sách trợ lý (bác sĩ chỉ xem trợ lý của mình)
router.get(
  "/",
  verifyToken,
  checkRole("ADMIN", "BACSI"),
  controller.getAll
);

//  Thêm trợ lý bác sĩ
router.post(
  "/",
  verifyToken,
  checkRole("ADMIN"),
  assistantValidator,
  controller.create
);

//  Cập nhật trợ lý
router.put(
  "/:maTroLy",
  verifyToken,
  checkRole("ADMIN"),
  assistantValidator,
  controller.update
);

//  Xoá trợ lý
router.delete(
  "/:maTroLy",
  verifyToken,
  checkRole("ADMIN"),
  controller.remove
);

module.exports = router;
