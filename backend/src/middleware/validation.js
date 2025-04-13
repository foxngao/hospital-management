const { check, validationResult } = require('express-validator');

exports.validateUser = [
    check('tenDangNhap').notEmpty().withMessage('Tên đăng nhập không được để trống'),
    check('matKhau').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
    check('email').isEmail().withMessage('Email không hợp lệ'),
    check('maNhom').notEmpty().withMessage('Nhóm quyền không được để trống'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Dữ liệu không hợp lệ', errors: errors.array() });
        }
        next();
    },
];

exports.validateAppointment = [
    check('maBN').notEmpty().withMessage('Mã bệnh nhân không được để trống'),
    check('maCa').notEmpty().withMessage('Mã ca khám không được để trống'),
    check('ngayHen').isISO8601().withMessage('Ngày hẹn không hợp lệ'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Dữ liệu lịch hẹn không hợp lệ', errors: errors.array() });
        }
        next();
    },
];