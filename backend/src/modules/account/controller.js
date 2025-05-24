const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const {
  TaiKhoan,
  BacSi,
  NhanSuYTe,
  BenhNhan,
  KhoaPhong
} = require("../../models");

// Tạo mới tài khoản
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  let {
    tenDangNhap,
    matKhau,
    email,
    maNhom,
    maKhoa,
    hoTen,
    chucVu,
    trinhDo,
    chuyenMon,
    loaiNS,
    capBac,
    ngaySinh,
    gioiTinh,
    diaChi,
    soDienThoai,
    bhyt
  } = req.body;

  maNhom = maNhom.toUpperCase().trim();

  try {
    const existed = await TaiKhoan.findOne({ where: { tenDangNhap } });
    if (existed)
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });

    const hashed = await bcrypt.hash(matKhau, 10);
    const maTK = uuidv4().slice(0, 8).toUpperCase(); // VD: "3FD28A9C"

    const newTK = await TaiKhoan.create({
      maTK,
      tenDangNhap,
      matKhau: hashed,
      email,
      maNhom,
      trangThai: true
    });

    if (maNhom === "BACSI") {
      await BacSi.create({ maBS: maTK, maTK, hoTen, chucVu, trinhDo, chuyenMon, maKhoa });
    } else if (maNhom === "NHANSU") {
      await NhanSuYTe.create({ maNS: maTK, maTK, hoTen, loaiNS, capBac, chuyenMon, maKhoa });
    } else if (maNhom === "BENHNHAN") {
      await BenhNhan.create({ maBN: maTK, maTK, hoTen, ngaySinh, gioiTinh, diaChi, soDienThoai, bhyt });
    }

    res.status(201).json({ message: "Tạo tài khoản thành công", data: newTK });
  } catch (error) {
    console.error("❌ Lỗi tạo tài khoản:", error.errors?.[0]?.message || error.message);
    res.status(500).json({
      message: "Lỗi tạo tài khoản",
      error: error.errors?.[0]?.message || error.message
    });
  }
};

// Cập nhật tài khoản
exports.update = async (req, res) => {
  try {
    const maTK = req.params.id;
    const {
      tenDangNhap, email, maNhom, trangThai,
      maKhoa, chucVu, trinhDo, chuyenMon, loaiNS, capBac,
      hoTen, ngaySinh, gioiTinh, diaChi, soDienThoai, bhyt
    } = req.body;

    const tk = await TaiKhoan.findOne({ where: { maTK } });
    if (!tk) return res.status(404).json({ message: "Không tìm thấy tài khoản" });

    await TaiKhoan.update({ tenDangNhap, email, maNhom, trangThai }, { where: { maTK } });

    if (maNhom === "BACSI") {
      await BacSi.update({ maKhoa, hoTen, chucVu, trinhDo, chuyenMon }, { where: { maTK } });
    } else if (maNhom === "NHANSU") {
      await NhanSuYTe.update({ maKhoa, hoTen, loaiNS, capBac, chuyenMon }, { where: { maTK } });
    } else if (maNhom === "BENHNHAN") {
      await BenhNhan.update({ hoTen, ngaySinh, gioiTinh, diaChi, soDienThoai, bhyt }, { where: { maTK } });
    }

    res.json({ message: "Cập nhật thành công" });
  } catch (error) {
    console.error("❌ Lỗi cập nhật:", error.message);
    res.status(500).json({ message: "Lỗi cập nhật", error: error.message });
  }
};

// Xoá tài khoản
exports.remove = async (req, res) => {
  try {
    const maTK = req.params.id;

    await BenhNhan.destroy({ where: { maTK } });
    await BacSi.destroy({ where: { maTK } });
    await NhanSuYTe.destroy({ where: { maTK } });

    const deleted = await TaiKhoan.destroy({ where: { maTK } });
    if (deleted === 0)
      return res.status(404).json({ message: "Không tìm thấy tài khoản để xoá" });

    res.json({ message: "Xoá thành công" });
  } catch (error) {
    console.error("❌ Lỗi khi xoá:", error.message);
    res.status(500).json({ message: "Lỗi khi xoá", error: error.message });
  }
};
// Lấy danh sách tài khoản
exports.getAll = async (req, res) => {
  try {
    const danhSach = await TaiKhoan.findAll({
      include: [
        {
          model: BacSi,
          attributes: ["maBS", "maKhoa", "chuyenMon", "chucVu", "trinhDo", "hoTen"],
          include: [{ model: KhoaPhong, attributes: ["tenKhoa"] }]
        },
        {
          model: NhanSuYTe,
          attributes: ["maNS", "maKhoa", "loaiNS", "chuyenMon", "capBac", "hoTen"],
          include: [{ model: KhoaPhong, attributes: ["tenKhoa"] }]
        },
        {
          model: BenhNhan,
          attributes: ["maBN", "hoTen", "gioiTinh", "ngaySinh", "soDienThoai", "bhyt", "diaChi"]
        }
      ]
    });

    const ketQua = danhSach.map((tk) => ({
      maTK: tk.maTK,
      tenDangNhap: tk.tenDangNhap,
      email: tk.email,
      maNhom: tk.maNhom,
      trangThai: tk.trangThai,
      tenKhoa: tk.BacSi?.KhoaPhong?.tenKhoa || tk.NhanSuYTe?.KhoaPhong?.tenKhoa || null,
      chuyenMon: tk.BacSi?.chuyenMon || tk.NhanSuYTe?.chuyenMon || null,
      chucVu: tk.BacSi?.chucVu || null,
      trinhDo: tk.BacSi?.trinhDo || null,
      loaiNS: tk.NhanSuYTe?.loaiNS || null,
      capBac: tk.NhanSuYTe?.capBac || null,
      hoTen: tk.BenhNhan?.hoTen || tk.BacSi?.hoTen || tk.NhanSuYTe?.hoTen || null,
      gioiTinh: tk.BenhNhan?.gioiTinh || null,
      ngaySinh: tk.BenhNhan?.ngaySinh || null,
      diaChi: tk.BenhNhan?.diaChi || null,
      soDienThoai: tk.BenhNhan?.soDienThoai || null,
      bhyt: tk.BenhNhan?.bhyt || null
    }));

    res.json(ketQua);
  } catch (error) {
    console.error("❌ Lỗi chính trong TaiKhoan.findAll:", error.message);
    res.status(500).json({ message: "Lỗi lấy danh sách tài khoản", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const acc = await TaiKhoan.findByPk(req.params.id);
    if (!acc) return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    res.json(acc);
  } catch (error) {
    console.error("❌ Lỗi getById:", error.message);
    res.status(500).json({ message: "Lỗi lấy tài khoản", error: error.message });
  }
};

/**
 * Nhân viên y tế đăng ký hộ bệnh nhân (gọi từ YTá)
 */
exports.dangKyBenhNhan = async (req, res) => {
  try {
    const {
      tenDangNhap, matKhau, email,
      hoTen, ngaySinh, gioiTinh,
      diaChi, soDienThoai, bhyt,
    } = req.body;

    const existing = await TaiKhoan.findOne({ where: { tenDangNhap } });
    if (existing)
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });

    const maTK = uuidv4().slice(0, 8).toUpperCase();
    const hashedPassword = await bcrypt.hash(matKhau, 10);

    const taiKhoan = await TaiKhoan.create({
      maTK,
      tenDangNhap,
      matKhau: hashedPassword,
      email,
      maNhom: "BENHNHAN",
      trangThai: true,
    });

    const benhNhan = await BenhNhan.create({
      maBN: maTK,
      hoTen,
      ngaySinh,
      gioiTinh,
      diaChi,
      soDienThoai,
      email,
      bhyt,
      maTK,
    });

    res.status(201).json({ message: "Tạo bệnh nhân thành công", data: { taiKhoan, benhNhan } });
  } catch (err) {
    console.error("❌ Lỗi đăng ký bệnh nhân:", err);
    res.status(500).json({ message: "Lỗi đăng ký", error: err.message });
  }
};