const { Op } = require('sequelize');
const TaiKhoan = require('./model');
const BenhNhan = require('../../models/BenhNhan');
const BacSi = require('../../models/BacSi');
const NhanSuYTe = require('../../models/NhanSuYTe');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==================== HÀM HỖ TRỢ TẠO MÃ TỰ ĐỘNG ====================
async function generateNextCode(prefix, model, field) {
    const lastRecord = await model.findOne({
        order: [[field, 'DESC']],
        where: {
            [field]: {
                [Op.like]: `${prefix}%`
            }
        }
    });

    if (!lastRecord) {
        return `${prefix}01`;
    }

    const lastNumberStr = lastRecord[field].replace(prefix, '');
    const lastNumber = parseInt(lastNumberStr, 10);
    const nextNumber = isNaN(lastNumber) ? 1 : lastNumber + 1;

    return `${prefix}${nextNumber.toString().padStart(2, '0')}`;
}

// ==================== ĐĂNG KÝ BỆNH NHÂN ====================
exports.registerPatient = [
    ...require('../../middleware/validation').validatePatient,
    async (req, res) => {
        try {
            const { tenDangNhap, matKhau, email, hoTen } = req.body;

            const existingUser = await TaiKhoan.findOne({ where: { tenDangNhap } });
            if (existingUser) {
                return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
            }

            const [maTK, maBN] = await Promise.all([
                generateNextCode('TK', TaiKhoan, 'maTK'),
                generateNextCode('BN', BenhNhan, 'maBN')
            ]);

            const hashedPassword = await bcrypt.hash(matKhau, 10);

            const [newUser] = await Promise.all([
                TaiKhoan.create({
                    maTK,
                    tenDangNhap,
                    matKhau: hashedPassword,
                    email,
                    maNhom: 'BENHNHAN',
                }),
                BenhNhan.create({
                    maBN,
                    maTK,
                    hoTen,
                })
            ]);

            res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi: ' + error.message });
        }
    }
];

// ==================== ĐĂNG KÝ BỆNH NHÂN BỞI NHÂN SỰ ====================
exports.registerPatientByStaff = [
    ...require('../../middleware/validation').validatePatient,
    async (req, res) => {
        try {
            if (req.user.maNhom !== 'NHANSU') {
                return res.status(403).json({ message: 'Chỉ nhân sự được tạo tài khoản bệnh nhân' });
            }

            const { tenDangNhap, matKhau, email, hoTen } = req.body;

            const existingUser = await TaiKhoan.findOne({ where: { tenDangNhap } });
            if (existingUser) {
                return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
            }

            const [maTK, maBN] = await Promise.all([
                generateNextCode('TK', TaiKhoan, 'maTK'),
                generateNextCode('BN', BenhNhan, 'maBN')
            ]);

            const hashedPassword = await bcrypt.hash(matKhau, 10);

            const [newUser] = await Promise.all([
                TaiKhoan.create({
                    maTK,
                    tenDangNhap,
                    matKhau: hashedPassword,
                    email,
                    maNhom: 'BENHNHAN',
                }),
                BenhNhan.create({
                    maBN,
                    maTK,
                    hoTen,
                })
            ]);

            res.status(201).json({ message: 'Tạo tài khoản bệnh nhân thành công', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi: ' + error.message });
        }
    }
];

// ==================== ĐĂNG KÝ NHÂN VIÊN ====================
exports.registerStaff = [
    ...require('../../middleware/validation').validateStaff,
    async (req, res) => {
        try {
            if (req.user.maNhom !== 'ADMIN') {
                return res.status(403).json({ message: 'Chỉ Admin được tạo tài khoản nhân viên' });
            }

            const { tenDangNhap, matKhau, email, maNhom,  hoTen, maKhoa, loaiNS } = req.body;

            const [existingUser, existingStaff] = await Promise.all([
                TaiKhoan.findOne({ where: { tenDangNhap } }),
                // TaiKhoan.findOne({ where: { maNhanVien } })
            ]);

            if (existingUser) {
                return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
            }
            // if (existingStaff) {
            //     return res.status(400).json({ message: 'Mã nhân viên đã tồn tại' });
            // }

            const [maTK, hashedPassword] = await Promise.all([
                generateNextCode('TK', TaiKhoan, 'maTK'),
                bcrypt.hash(matKhau, 10)
            ]);

            const newUser = await TaiKhoan.create({
                maTK,
                tenDangNhap,
                matKhau: hashedPassword,
                email,
                maNhom,
            });

            if (maNhom === 'BACSI') {
                const maBS = await generateNextCode('BS', BacSi, 'maBS');
                await BacSi.create({
                    maBS,
                    maTK,
                    maKhoa,
                    hoTen,
                });
            } else if (maNhom === 'NHANSU') {
                const maNS = await generateNextCode('NS', NhanSuYTe, 'maNS');
                await NhanSuYTe.create({
                    maNS,
                    maTK,
                    maKhoa,
                    hoTen,
                    loaiNS: loaiNS || 'TIEP_DON',
                });
            }

            res.status(201).json({ message: 'Tạo tài khoản nhân viên thành công', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi: ' + error.message });
        }
    }
];

// ==================== ĐĂNG KÝ ADMIN ====================
exports.registerAdmin = [
    ...require('../../middleware/validation').validateAdmin,
    async (req, res) => {
        try {
            const existingAdmin = await TaiKhoan.findOne({ where: { maNhom: 'ADMIN' } });
            if (existingAdmin) {
                return res.status(400).json({ message: 'Hệ thống đã có Admin' });
            }

            const { tenDangNhap, matKhau, email, hoTen } = req.body;

            const existingUser = await TaiKhoan.findOne({ where: { tenDangNhap } });
            if (existingUser) {
                return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
            }

            const [maTK, hashedPassword] = await Promise.all([
                generateNextCode('TK', TaiKhoan, 'maTK'),
                bcrypt.hash(matKhau, 10)
            ]);

            const newAdmin = await TaiKhoan.create({
                maTK,
                tenDangNhap,
                matKhau: hashedPassword,
                email,
                hoTen,
                maNhom: 'ADMIN'
            });

            res.status(201).json({ 
                message: 'Tạo tài khoản Admin thành công', 
                admin: {
                    maTK: newAdmin.maTK,
                    tenDangNhap: newAdmin.tenDangNhap,
                    email: newAdmin.email,
                    hoTen: newAdmin.hoTen
                } 
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo tài khoản Admin: ' + error.message });
        }
    }
];

// ==================== ĐĂNG NHẬP ====================
exports.login = async (req, res) => {
    try {
        const { tenDangNhap, matKhau } = req.body;
        const user = await TaiKhoan.findOne({ where: { tenDangNhap } });

        if (!user || !(await bcrypt.compare(matKhau, user.matKhau))) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không đúng' });
        }

        const token = jwt.sign(
            { maTK: user.maTK, maNhom: user.maNhom },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi: ' + error.message });
    }
};

// ==================== ĐĂNG XUẤT ====================
exports.logout = (req, res) => {
    res.json({ message: 'Đăng xuất thành công' });
};