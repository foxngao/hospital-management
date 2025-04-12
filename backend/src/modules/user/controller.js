const User = require('./model');
const TaiKhoan = require('../auth/model');

exports.createUser = async (req, res) => {
    try {
        const { maTK, hoTen, loaiUser, maKhoa } = req.body;
        const newUser = await User.create({ maUser: generateUserId(), maTK, hoTen, loaiUser, maKhoa });
        res.status(201).json({ message: 'Tạo người dùng thành công', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo người dùng: ' + error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ include: [TaiKhoan] });
        res.json({ message: 'Lấy danh sách người dùng thành công', users });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy người dùng: ' + error.message });
    }
};

function generateUserId() {
    return 'USER' + Date.now();
}