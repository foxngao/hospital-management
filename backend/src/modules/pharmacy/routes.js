const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { body } = require("express-validator");
const verifyToken = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");

// ✅ Validator khi thêm/cập nhật thuốc
const medicineValidator = [
  body("tenThuoc").notEmpty().withMessage("Tên thuốc là bắt buộc"),
  body("maNhom").notEmpty().withMessage("Mã nhóm thuốc là bắt buộc"),
  body("donVi").notEmpty().withMessage("Đơn vị là bắt buộc"),
  body("gia").isFloat({ min: 0 }).withMessage("Giá phải lớn hơn hoặc bằng 0"),
  body("soLuong").isInt({ min: 0 }).withMessage("Số lượng phải là số nguyên ≥ 0"),
];

/**
 * ROUTES
 * GET     /api/pharmacy/            → Mọi người dùng đăng nhập được xem
 * GET     /api/pharmacy/:id         → Xem chi tiết thuốc
 * POST    /api/pharmacy/            → `ADMIN`, `PHARMACIST` thêm thuốc
 * PUT     /api/pharmacy/:id         → `ADMIN` cập nhật
 * DELETE  /api/pharmacy/:id         → `ADMIN` xoá
 */

//  Xem tất cả thuốc (filter theo nhóm, giá)
router.get("/", verifyToken, controller.getAllMedicines);

//  Xem chi tiết 1 thuốc
router.get("/:id", verifyToken, controller.getMedicineById);

//  Thêm thuốc mới
router.post(
  "/",
  verifyToken,
  checkRole("ADMIN", "PHARMACIST"),
  medicineValidator,
  controller.createMedicine
);

//  Cập nhật thuốc
router.put(
  "/:id",
  verifyToken,
  checkRole("ADMIN"),
  medicineValidator,
  controller.updateMedicine
);

//  Xoá thuốc
router.delete(
  "/:id",
  verifyToken,
  checkRole("ADMIN"),
  controller.deleteMedicine
);

module.exports = router;
