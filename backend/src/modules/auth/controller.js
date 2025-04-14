const TaiKhoan = require('./model');
const BenhNhan = require('../../models/BenhNhan');
const BacSi = require('../../models/BacSi');
const NhanSuYTe = require('../../models/NhanSuYTe');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerPatient = [
    ...require('../../middleware/validation').validatePatient,
    async (req, res) => {
        console.log('Đang xử lý đăng ký bệnh nhân...');
        try {
            const { tenDangNhap, matKhau, email, hoTen } = req.body;

            // Kiểm tra xem tài khoản đã tồn tại chưa
            const existingUser = await TaiKhoan.findOne({ where: { tenDangNhap } });
            if (existingUser) {
                return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
            }

            // Sinh giá trị duy nhất cho maTK và maBN
            const maTK = `TK_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
            const maBN = `BN_${Date.now()}`;

            const hashedPassword = await bcrypt.hash(matKhau, 10);

            // Tạo tài khoản
            const newUser = await TaiKhoan.create({
                maTK,
                tenDangNhap,
                matKhau: hashedPassword,
                email,
                maNhom: 'BENHNHAN',
            });

            // Tạo hồ sơ bệnh nhân
            await BenhNhan.create({
                maBN,
                maTK,
                hoTen,
            });

            res.status(201).json({ message: 'Đăng ký tài khoản bệnh nhân thành công', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi đăng ký bệnh nhân: ' + error.message });
        }
    },
];

exports.registerPatientByStaff = [
    ...require('../../middleware/validation').validatePatient,
    async (req, res) => {
        console.log('Đang xử lý tạo tài khoản bệnh nhân bởi nhân sự...');
        try {
            // Kiểm tra quyền: chỉ nhân sự được tạo
            if (req.user.maNhom !== 'NHANSU') {
                return res.status(403).json({ message: 'Chỉ nhân sự được tạo tài khoản bệnh nhân' });
            }

            const { tenDangNhap, matKhau, email, hoTen } = req.body;

            // Kiểm tra xem tài khoản đã tồn tại chưa
            const existingUser = await TaiKhoan.findOne({ where: { tenDangNhap } });
            if (existingUser) {
                return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
            }

            // Sinh giá trị duy nhất cho maTK và maBN
            const maTK = `TK_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
            const maBN = `BN_${Date.now()}`;

            const hashedPassword = await bcrypt.hash(matKhau, 10);

            // Tạo tài khoản
            const newUser = await TaiKhoan.create({
                maTK,
                tenDangNhap,
                matKhau: hashedPassword,
                email,
                maNhom: 'BENHNHAN',
            });

            // Tạo hồ sơ bệnh nhân
            await BenhNhan.create({
                maBN,
                maTK,
                hoTen,
            });

            res.status(201).json({ message: 'Tạo tài khoản bệnh nhân bởi nhân sự thành công', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo tài khoản bệnh nhân: ' + error.message });
        }
    },
];

exports.registerStaff = [
    ...require('../../middleware/validation').validateStaff,
    async (req, res) => {
        console.log('Đang xử lý tạo tài khoản nhân viên...');
        try {
            // Kiểm tra quyền: chỉ Admin được tạo
            if (req.user.maNhom !== 'ADMIN') {
                return res.status(403).json({ message: 'Chỉ Admin được tạo tài khoản nhân viên' });
            }

            const { tenDangNhap, matKhau, email, maNhom, maNhanVien, hoTen, maKhoa, loaiNS } = req.body;

            // Kiểm tra xem tài khoản đã tồn tại chưa
            const existingUser = await TaiKhoan.findOne({ where: { tenDangNhap } });
            if (existingUser) {
                return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
            }

            // Kiểm tra mã nhân viên
            const existingStaff = await TaiKhoan.findOne({ where: { maNhanVien } });
            if (existingStaff) {
                return res.status(400).json({ message: 'Mã nhân viên đã tồn tại' });
            }

            // Sinh giá trị duy nhất cho maTK
            const maTK = `TK_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
            const hashedPassword = await bcrypt.hash(matKhau, 10);

            // Tạo tài khoản
            const newUser = await TaiKhoan.create({
                maTK,
                tenDangNhap,
                matKhau: hashedPassword,
                email,
                maNhanVien,
                maNhom,
            });

            // Tạo thông tin bác sĩ hoặc nhân sự
            if (maNhom === 'BACSI') {
                await BacSi.create({
                    maBS: `BS_${Date.now()}`,
                    maTK,
                    maKhoa,
                    hoTen,
                });
            } else if (maNhom === 'NHANSU') {
                await NhanSuYTe.create({
                    maNS: `NS_${Date.now()}`,
                    maTK,
                    maKhoa,
                    hoTen,
                    loaiNS: loaiNS || 'TIEP_DON',
                });
            }

            res.status(201).json({ message: 'Tạo tài khoản nhân viên thành công', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo tài khoản nhân viên: ' + error.message });
        }
    },
];

exports.login = async (req, res) => {
    console.log('Đang xử lý đăng nhập...');
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
    console.log('Đang xử lý đăng xuất...');
    res.json({ message: 'Đăng xuất thành công' });
};