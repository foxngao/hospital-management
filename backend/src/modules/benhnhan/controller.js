const { BenhNhan, TaiKhoan } = require("../../models");

exports.getAll = async (req, res) => {
  try {
    const ds = await BenhNhan.findAll({
      include: [{ model: TaiKhoan, attributes: ["tenDangNhap", "email", "trangThai"] }]
    });
    res.json({ message: "Lấy danh sách bệnh nhân", data: ds });
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy danh sách", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { hoTen, gioiTinh, ngaySinh, diaChi, soDienThoai, bhyt } = req.body;
    const [updated] = await BenhNhan.update(
      { hoTen, gioiTinh, ngaySinh, diaChi, soDienThoai, bhyt },
      { where: { maBN: req.params.id } }
    );
    if (updated === 0)
      return res.status(404).json({ message: "Không tìm thấy bệnh nhân" });
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật", error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await BenhNhan.destroy({ where: { maBN: req.params.id } });
    if (deleted === 0)
      return res.status(404).json({ message: "Không tìm thấy bệnh nhân để xoá" });
    res.json({ message: "Xoá thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi xoá bệnh nhân", error: err.message });
  }
};
