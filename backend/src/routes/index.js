const express = require("express");
const router = express.Router();

//  Đăng nhập & phân quyền
router.use("/auth", require("../modules/auth"));

//  Quản lý người dùng*******
router.use("/nguoi-dung", require("../modules/user"));

//  Đặt lịch hẹn khám
router.use("/lich-hen", require("../modules/appointment"));

//  Quản lý thuốc, dược
router.use("/nha-thuoc", require("../modules/pharmacy"));
router.use("/duoc-ly", require("../modules/medicalInfo"));
router.use("/nhom-thuoc", require("../modules/medicineType"));

//  Khoa, phòng********
router.use("/khoa-phong", require("../modules/department"));

//  Xét nghiệm
router.use("/xet-nghiem", require("../modules/LabTest"));

//  Hồ sơ bệnh án
router.use("/ho-so", require("../modules/medicalRecord"));

//  Hóa đơn, thanh toán
router.use("/hoa-don", require("../modules/billing"));

//  Phản hồi - Tin tức - Thông báo
router.use("/phan-hoi", require("../modules/feedback"));
router.use("/tin-tuc", require("../modules/news"));
router.use("/thong-bao", require("../modules/Notification"));
//-----------------------------------------------------------------------------
//  Trợ lý bác sĩ
router.use("/tro-ly", require("../modules/assistant"));

//  Quản lý tài khoản
router.use("/tai-khoan", require("../modules/account"));
//  Quản lý khoa, phòng
router.use("/khoa", require("../modules/khoa"));
//  Quản lý bác sĩ
router.use("/bacsi", require("../modules/bacsi"));


module.exports = router;
