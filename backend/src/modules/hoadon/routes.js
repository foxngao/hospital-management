// ROUTES: Định tuyến API cho module hoá đơn – hoadon, chi tiết, thanh toán, giỏ hàng
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const checkRole = require("../../middleware/checkRole");
const verifyToken = require("../../middleware/auth");
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

// ---------------- BỆNH NHÂN ----------------
router.post("/giohang/confirm", controller.confirmGioHang); // bệnh nhân xác nhận giỏ hàng → hóa đơn
router.get("/myhoadon/:maBN", controller.getHoaDonByBenhNhan); // bệnh nhân xem danh sách hóa đơn
router.get("/thanhtoan/:maHD", controller.getThanhToanByHoaDon); // xem thanh toán theo mã hoá đơn
// ---------------- CHI TIẾT GIỎ HÀNG ----------------
router.delete("/giohang/item/:id", controller.deleteChiTietGioHang);
