const TaiKhoan = require('./model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = [
    ...require('../../middleware/validation').validateUser,
    async (req, res) => {
        console.log('Đang xử lý đăng ký...');
        
        try {
            const { tenDangNhap, matKhau, email, maNhom } = req.body;

            // Chỉ cho phép bệnh nhân tự tạo tài khoản
            if (maNhom !== 'BENHNHAN' && maNhom !== 'ADMIN') {
                return res.status(403).json({ message: 'Chỉ bệnh nhân mới được tạo tài khoản' });
                return res.status(403).json({ message: 'Chỉ Admin được tạo tài khoản cho bác sĩ và nhân sự' });
            }

            // Sinh giá trị duy nhất cho maTK
            const maTK = `TK_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

            const hashedPassword = await bcrypt.hash(matKhau, 10);
            const newUser = await TaiKhoan.create({
                maTK, // Thêm giá trị maTK
                tenDangNhap,
                matKhau: hashedPassword,
                email,
                maNhom,
            });
            res.status(201).json({ message: 'Đăng ký tài khoản thành công', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi đăng ký: ' + error.message });
        }
    },
];

exports.login = async (req, res) => {
    try {
        const { tenDangNhap, matKhau } = req.body;
        const user = await TaiKhoan.findOne({ where: { tenDangNhap } });
        if (!user || !await bcrypt.compare(matKhau, user.matKhau)) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không đúng' });
        }

        const token = jwt.sign({ maTK: user.maTK, maNhom: user.maNhom }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đăng nhập: ' + error.message });
    }
};

exports.logout = (req, res) => {
    res.json({ message: 'Đăng xuất thành công' });
};