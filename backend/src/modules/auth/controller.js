const { TaiKhoan, BenhNhan, BacSi, NhomQuyen } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

/**
 * Đăng ký tài khoản mới
 * Tự động gán vào bảng BenhNhan nếu maNhom là 'BENHNHAN'
 * Tự động gán vào bảng BacSi nếu maNhom là 'BACSI'
 * Tự động gán vào bảng NhanVien nếu maNhom là 'NHANSU'
 * Tự động gán vào bảng NhomQuyen nếu maNhom là 'ADMIN'
 */
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { tenDangNhap, matKhau, email, maNhom } = req.body;

  try {
    const existingUser = await TaiKhoan.findOne({ where: { tenDangNhap } });
    if (existingUser)
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });

    const hashedPassword = await bcrypt.hash(matKhau, 10);
    const maTK = uuidv4();

    const newUser = await TaiKhoan.create({
      maTK,
      tenDangNhap,
      matKhau: hashedPassword,
      email,
      maNhom,
      trangThai: true,
    });

    // Nếu là bệnh nhân thì tạo hồ sơ bênh nhân liên kết
    if (maNhom === 'BENHNHAN') {
      await BenhNhan.create({
        maBN: maTK,
        hoTen: tenDangNhap,
        email,
        maTK: maTK,
      });

    }

    res.status(201).json({ message: "Đăng ký thành công", data: newUser });
  } catch (error) {
    console.error(" Lỗi khi đăng ký:", error);  // thêm dòng này
    res.status(500).json({ message: "Lỗi khi đăng ký", error: error.message });
  }
};

/**
 * Đăng nhập hệ thống
 * Trả về token + thông tin người dùng
 */
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { tenDangNhap, matKhau } = req.body;

  try {
    const user = await TaiKhoan.findOne({ where: { tenDangNhap } });

    if (!user)
      return res.status(404).json({ message: "Tài khoản không tồn tại" });

    if (!user.trangThai)
      return res.status(403).json({ message: "Tài khoản đang bị khóa" });

    const match = await bcrypt.compare(matKhau, user.matKhau);
    if (!match)
      return res.status(401).json({ message: "Mật khẩu không đúng" });

    const token = jwt.sign(
      { maTK: user.maTK, tenDangNhap: user.tenDangNhap, maNhom: user.maNhom },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    const nhomQuyen = await NhomQuyen.findOne({ where: { maNhom: user.maNhom } });

    res.status(200).json({
      token,
      message: "Đăng nhập thành công",
      user: {
        maTK: user.maTK,
        tenDangNhap: user.tenDangNhap,
        email: user.email,
        maNhom: user.maNhom,
        tenNhom: nhomQuyen?.tenNhom || "Không xác định",
      },
    });
  } catch (error) {
    console.error(" Lỗi khi đăng ký:", error);
    res.status(500).json({ message: "Lỗi khi đăng nhập", error: error.message });
  }
};
