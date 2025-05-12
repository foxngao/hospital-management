const db = require("../../models");
const { v4: uuidv4 } = require("uuid");
const Phieu = db.PhieuXetNghiem;
const YeuCau = db.YeuCauXetNghiem;
const XetNghiem = db.XetNghiem;
const NhanSuYTe = db.NhanSuYTe;
const HoSoBenhAn = db.HoSoBenhAn;

exports.getAll = async (req, res) => {
  try {
    const list = await Phieu.findAll({
      include: [YeuCau, XetNghiem, NhanSuYTe, HoSoBenhAn],
      order: [["ngayThucHien", "DESC"]],
    });
    res.json({ success: true, data: list });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi lấy dữ liệu", error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { maYeuCau, maXN, maNS, maHSBA, ngayThucHien, ghiChu } = req.body;
    const maPhieuXN = uuidv4().slice(0, 8).toUpperCase();
    const created = await Phieu.create({ maPhieuXN, maYeuCau, maXN, maNS, maHSBA, ngayThucHien, ghiChu });
    res.status(201).json({ success: true, message: "Đã tạo phiếu xét nghiệm", data: created });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi tạo phiếu", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { ketQua, ghiChu } = req.body;
    const [updated] = await Phieu.update({ ketQua, ghiChu }, {
      where: { maPhieuXN: req.params.id }
    });
    if (!updated) return res.status(404).json({ success: false, message: "Không tìm thấy phiếu" });
    res.json({ success: true, message: "Đã cập nhật kết quả phiếu" });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi cập nhật", error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Phieu.destroy({ where: { maPhieuXN: req.params.id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Không tìm thấy để xoá" });
    res.json({ success: true, message: "Đã xoá phiếu xét nghiệm" });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi xoá", error: err.message });
  }
};
