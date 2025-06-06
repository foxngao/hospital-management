const { TaiKhoan, BenhNhan, BacSi, NhomQuyen } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

/**
 * Đăng ký tài khoản mới
 * Tự động gán vào bảng BenhNhan nếu maNhom là 'BENHNHAN'
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
    console.log("🟢 Mã hoá mật khẩu OK");

    const maTK = uuidv4().slice(0, 8).toUpperCase();
    console.log("🟢 Sinh mã TK:", maTK);
    
    const newUser = await TaiKhoan.create({
      maTK,
      tenDangNhap,
      matKhau: hashedPassword,
      email,
      maNhom,
      trangThai: true,
    });
    
    console.log("🟢 Tạo tài khoản thành công:", newUser?.maTK);

    res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      token: null,
      user: {
        maTK: newUser.maTK,
        tenDangNhap: newUser.tenDangNhap,
        email: newUser.email,
        maNhom: newUser.maNhom
      }
    });

  } catch (error) {
    console.error("❌ Lỗi khi đăng ký:", error);  // CHỐT Ở ĐÂY
    res.status(500).json({ message: "Lỗi khi đăng ký", error: error.message });
  }
};

/**
 * Đăng nhập hệ thống
 * Trả về token + thông tin người dùng (gồm loaiNS, maBN nếu là bệnh nhân)
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

    let loaiNS = null;
    if (user.maNhom === "NHANSU") {
      const { NhanSuYTe } = require("../../models");
      const ns = await NhanSuYTe.findOne({ where: { maTK: user.maTK } });
      loaiNS = ns?.loaiNS || null;
    }

    // ✅ Lấy maBN nếu là bệnh nhân
    let maBN = null;
    if (user.maNhom === "BENHNHAN") {
      const benhNhan = await BenhNhan.findOne({ where: { maTK: user.maTK } });
      console.log("🟡 Debug BenhNhan:", benhNhan); // LOG KIỂM TRA
      maBN = benhNhan?.maBN || null;
    }

    // ✅ Lấy maBS nếu là bác sĩ
    let maBS = null;
    if (user.maNhom === "BACSI") {
      const bacSi = await BacSi.findOne({ where: { maTK: user.maTK } });
      maBS = bacSi?.maBS || null;
    }

    res.status(200).json({
      token,
      message: "Đăng nhập thành công",
      user: {
        maTK: user.maTK,
        tenDangNhap: user.tenDangNhap,
        email: user.email,
        maNhom: user.maNhom,
        tenNhom: nhomQuyen?.tenNhom || "Không xác định",
        loaiNS,
        maBN,
        maBS, // ✅ Gửi xuống frontend
      },
    });
  } catch (error) {
    console.error("❌ Lỗi khi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi khi đăng nhập", error: error.message });
  }
};

/**
 * Lấy thông tin tài khoản từ token
 */
exports.getCurrentUser = async (req, res) => {
  try {
    const { maTK } = req.user;

    const user = await TaiKhoan.findByPk(maTK);
    if (!user) return res.status(404).json(null);

    return res.json({
      maTK: user.maTK,
      tenDangNhap: user.tenDangNhap,
      email: user.email,
      maNhom: user.maNhom,
    });
  } catch (err) {
    console.error("❌ Lỗi khi lấy thông tin user từ token:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};



/**
 * Tạo mã xác thực
 */
exports.taoMaXacThuc = (req, res) => {
  const { maTK } = req.params;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  maXacThucMap[maTK] = code;
  res.json({ success: true, message: "Mã xác thực của bạn là: " + code });
};

/**
 * Đổi mật khẩu (không cần mã xác thực)
 */
exports.doiMatKhau = async (req, res) => {
  const { maTK, matKhauCu, matKhauMoi } = req.body;

  try {
    const taiKhoan = await TaiKhoan.findByPk(maTK);
    if (!taiKhoan)
      return res.status(404).json({ success: false, message: "Không tìm thấy tài khoản" });

    const match = await bcrypt.compare(matKhauCu, taiKhoan.matKhau);
    if (!match)
      return res.status(400).json({ success: false, message: "Mật khẩu cũ không đúng" });

    if (matKhauMoi === matKhauCu) {
      return res.status(400).json({ success: false, message: "Mật khẩu mới không được trùng mật khẩu cũ" });
    }

    const hashedNew = await bcrypt.hash(matKhauMoi, 10);
    taiKhoan.matKhau = hashedNew;
    await taiKhoan.save();

    return res.json({ success: true, message: "✅ Đổi mật khẩu thành công" });
  } catch (err) {
    console.error("❌ Lỗi đổi mật khẩu:", err);
    return res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
};


/**
 * Quên mật khẩu
 */
exports.quenMatKhau = async (req, res) => {
  const { maTK, maBenhNhan, email } = req.body;
  const benhNhan = await BenhNhan.findByPk(maBenhNhan);
  const taiKhoan = await TaiKhoan.findByPk(maTK);

  if (!taiKhoan) {
    return res.status(400).json({ success: false, message: "Tài khoản không tồn tại" });
  }

  if (!benhNhan || benhNhan.email !== email) {
    return res.status(400).json({ success: false, message: "Email không khớp với bệnh nhân" });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  maXacThucMap[maTK] = code;

  console.log(`✅ Mã xác thực gửi tới email ${email}: ${code}`);

  return res.json({ success: true, message: "Mã xác thực đã gửi (demo)", maXacThuc: code });
};
