const TaiKhoan = require('./model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { tenDangNhap, matKhau, email, maNhom } = req.body;
        const hashedPassword = await bcrypt.hash(matKhau, 10);

        // Tự động tạo maTK (ví dụ: TK + timestamp)
        const maTK = `TK${Date.now()}`;

        const newUser = await TaiKhoan.create({
            maTK,
            tenDangNhap,
            matKhau: hashedPassword,
            email,
            maNhom,
        });
        res.status(201).json({ message: 'Đăng ký tài khoản thành công', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đăng ký: ' + error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { tenDangNhap, matKhau } = req.body;
        const user = await TaiKhoan.findOne({ where: { tenDangNhap } });
        if (!user || !await bcrypt.compare(matKhau, user.matKhau)) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không đúng' });
        }

        const token = jwt.sign({ maTK: user.maTK }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đăng nhập: ' + error.message });
    }
};

exports.logout = (req, res) => {
    res.json({ message: 'Đăng xuất thành công' });
};