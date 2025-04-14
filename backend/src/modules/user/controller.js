const User = require('./model');
const TaiKhoan = require('../auth/model');

exports.updateUser = [
    ...require('../../middleware/validation').validateUser,
    async (req, res) => {
        try {
            const { maUser } = req.params; // Lấy maUser từ URL
            const { hoTen, loaiUser, maKhoa, maNhom } = req.body;

            // Kiểm tra quyền: chỉ Admin được sửa
            if (req.user.maNhom !== 'ADMIN') {
                return res.status(403).json({ message: 'Chỉ Admin được sửa thông tin người dùng' });
            }

            const user = await User.findByPk(maUser);
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }

            await user.update({ hoTen, loaiUser, maKhoa, maNhom });
            res.json({ message: 'Cập nhật người dùng thành công', user });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật người dùng: ' + error.message });
        }
    },
];

exports.deleteUser = [
    async (req, res) => {
        try {
            const { maUser } = req.params;

            // Kiểm tra quyền: chỉ Admin được xóa
            if (req.user.maNhom !== 'ADMIN') {
                return res.status(403).json({ message: 'Chỉ Admin được xóa người dùng' });
            }

            const user = await User.findByPk(maUser);
            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }

            await user.destroy();
            res.json({ message: 'Xóa người dùng thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa người dùng: ' + error.message });
        }
    },
];

exports.createUser = [
    ...require('../../middleware/validation').validateUser,
    async (req, res) => {
        try {
            const { maTK, hoTen, loaiUser, maKhoa, maNhom } = req.body;

            // Chỉ Admin được tạo tài khoản bác sĩ và nhân sự
            if (maNhom === 'BACSI' || maNhom === 'NHANSU') {
                if (req.user.maNhom !== 'ADMIN') {
                    return res.status(403).json({ message: 'Chỉ Admin được tạo tài khoản này' });
                }
            }

            const newUser = await User.create({ maUser: generateUserId(), maTK, hoTen, loaiUser, maKhoa, maNhom });
            res.status(201).json({ message: 'Tạo người dùng thành công', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo người dùng: ' + error.message });
        }
    },
];

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ include: [TaiKhoan] });
        res.json({ message: 'Lấy danh sách người dùng thành công', users });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy người dùng: ' + error.message });
    }
};

// Hàm hỗ trợ
function generateUserId() {
    return 'USER' + Date.now();
}