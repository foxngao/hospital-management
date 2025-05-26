const db = require("../../models");
const { v4: uuidv4 } = require("uuid");

const Phieu = db.PhieuXetNghiem;
const YeuCau = db.YeuCauXetNghiem;
const XetNghiem = db.XetNghiem;
const NhanSuYTe = db.NhanSuYTe;
const HoSoBenhAn = db.HoSoBenhAn;

// ✅ GET ALL - có alias đầy đủ
exports.getAll = async (req, res) => {
  try {
    const list = await Phieu.findAll({
      include: [
        { model: YeuCau, as: "YeuCau" },
        { model: XetNghiem, as: "XetNghiem" },
        { model: NhanSuYTe, as: "NhanSuYTe" },
        { model: HoSoBenhAn, as: "HoSoBenhAn" }
      ],
      order: [["ngayThucHien", "DESC"]],
    });
    res.json({ success: true, data: list });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({
      success: false,
      message: "Lỗi lấy dữ liệu",
      error: err.message
    });
  }
};

// ✅ CREATE
exports.create = async (req, res) => {
  try {
    const { maYeuCau, maXN, maNS, maHSBA, ngayThucHien, ghiChu } = req.body;
    const maPhieuXN = uuidv4().slice(0, 8).toUpperCase();

    const created = await Phieu.create({
      maPhieuXN, maYeuCau, maXN, maNS, maHSBA, ngayThucHien, ghiChu
    });

    res.status(201).json({
      success: true,
      message: "Đã tạo phiếu xét nghiệm",
      data: created
    });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({
      success: false,
      message: "Lỗi tạo phiếu",
      error: err.message
    });
  }
};

// ✅ UPDATE
exports.update = async (req, res) => {
  try {
    const { ketQua, ghiChu } = req.body;
    const [updated] = await Phieu.update(
      { ketQua, ghiChu },
      { where: { maPhieuXN: req.params.id } }
    );
    if (!updated)
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy phiếu"
      });

    res.json({ success: true, message: "Đã cập nhật kết quả phiếu" });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({
      success: false,
      message: "Lỗi cập nhật",
      error: err.message
    });
  }
};

// ✅ REMOVE
exports.remove = async (req, res) => {
  try {
    const deleted = await Phieu.destroy({
      where: { maPhieuXN: req.params.id }
    });
    if (!deleted)
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy để xoá"
      });

    res.json({ success: true, message: "Đã xoá phiếu xét nghiệm" });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({
      success: false,
      message: "Lỗi xoá",
      error: err.message
    });
  }
};
