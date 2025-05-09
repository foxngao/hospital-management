const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const controller = require("./controller");

// Tạo mới tài khoản
router.post(
  "/",
  body("tenDangNhap").notEmpty(),
  body("matKhau").notEmpty(),
  body("maNhom").notEmpty(),
  controller.register
);

// Lấy danh sách
router.get("/", controller.getAll);

// Lấy theo ID
router.get("/:id", controller.getById);

// Cập nhật
router.put("/:id", controller.update);

// Xoá
router.delete("/:id", controller.remove);

module.exports = router;
