const express = require("express");
const router = express.Router();
const controller = require("./controller");
const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const { body } = require("express-validator");

//  Validator khi tạo/cập nhật nhóm thuốc
const medicineTypeValidator = [
  body("tenNhom").notEmpty().withMessage("Tên nhóm thuốc là bắt buộc"),
  body("moTa").optional().isString().withMessage("Mô tả phải là chuỗi"),
];

/**
 * ROUTES
 * GET     /api/medicine-type/         → Tất cả người dùng đã đăng nhập
 * POST    /api/medicine-type/         → Chỉ ADMIN được thêm
 * PUT     /api/medicine-type/:maNhom  → Chỉ ADMIN được sửa
 * DELETE  /api/medicine-type/:maNhom  → Chỉ ADMIN được xoá
 */

//  Xem danh sách nhóm thuốc
router.get("/", verifyToken, controller.getAll);

//  Thêm nhóm thuốc mới
router.post("/", verifyToken, checkRole("ADMIN"), medicineTypeValidator, controller.create);

//  Cập nhật nhóm thuốc
router.put("/:maNhom", verifyToken, checkRole("ADMIN"), medicineTypeValidator, controller.update);

//  Xoá nhóm thuốc
router.delete("/:maNhom", verifyToken, checkRole("ADMIN"), controller.remove);

module.exports = router;
