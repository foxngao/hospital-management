const { TaiKhoan, BenhNhan, BacSi, NhanSuYTe } = require("../../models");

/**
 * Lấy thông tin hồ sơ người dùng hiện tại (dựa vào token)
 */
exports.getProfile = async (req, res) => {
  const { maTK, maNhom } = req.user;

  try {
    const taiKhoan = await TaiKhoan.findOne({
      where: { maTK },
      attributes: { exclude: ["matKhau"] },
    });

    if (!taiKhoan)
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });

    let hoSo = null;

    if (maNhom === "BENHNHAN") {
      hoSo = await BenhNhan.findOne({ where: { maTaiKhoan: maTK } });
    } else if (maNhom === "BACSI") {
      hoSo = await BacSi.findOne({ where: { maTK } });
    } else {
      hoSo = await NhanSuYTe.findOne({ where: { maTK } });
    }

    res.json({ taiKhoan, hoSo });
  } catch (error) {
    res.status(500).json({ message: "Lỗi truy xuất thông tin", error: error.message });
  }
};

/**
 * Cập nhật thông tin hồ sơ cá nhân (dành cho người dùng đã đăng nhập)
 */
exports.updateProfile = async (req, res) => {
  const { maTK, maNhom } = req.user;
  const { hoTen, diaChi, soDienThoai, email, ngaySinh } = req.body;

  try {
    const taiKhoan = await TaiKhoan.findByPk(maTK);
    if (!taiKhoan)
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });

    // Cập nhật email nếu có
    if (email) taiKhoan.email = email;
    await taiKhoan.save();

    let affected = 0;

    if (maNhom === "BENHNHAN") {
      affected = await BenhNhan.update(
        { hoTen, diaChi, soDienThoai, ngaySinh },
        { where: { maTaiKhoan: maTK } }
      );
    } else if (maNhom === "BACSI") {
      affected = await BacSi.update(
        { hoTen, chuyenMon: req.body.chuyenMon, chucVu: req.body.chucVu },
        { where: { maTK } }
      );
    } else {
      affected = await NhanSuYTe.update(
        { hoTen, diaChi, soDienThoai, capBac: req.body.capBac },
        { where: { maTK } }
      );
    }

    res.json({ message: "Cập nhật hồ sơ thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật thông tin", error: error.message });
  }
};
