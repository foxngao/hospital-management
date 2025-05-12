// ROUTES: Định tuyến API cho module hoá đơn – hoadon, chi tiết, thanh toán, giỏ hàng
const express = require("express");
const router = express.Router();
const controller = require("./controller");

// ---------------- HOÁ ĐƠN ----------------
router.get("/", controller.getAllHoaDon);// lấy tất cả hoá đơn
router.post("/", controller.createHoaDon);// tạo hoá đơn mới

// ---------------- CHI TIẾT HOÁ ĐƠN ----------------
router.post("/chitiet", controller.addChiTietHD);// thêm chi tiết hoá đơn

// ---------------- THANH TOÁN ----------------
router.post("/thanhtoan", controller.createThanhToan);// tạo thanh toán

// ---------------- CẬP NHẬT TRẠNG THÁI HOÁ ĐƠN ----------------
router.put("/:maHD", controller.updateTrangThai);// cập nhật trạng thái hoá đơn theo mã


// ---------------- GIỎ HÀNG ----------------
router.get("/giohang/:maBN", controller.getGioHang);// lấy giỏ hàng theo mã bệnh nhân
router.post("/giohang", controller.addToGioHang);// thêm sản phẩm vào giỏ hàng

module.exports = router;
