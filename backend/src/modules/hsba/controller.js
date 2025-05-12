const db = require("../../models");
const { v4: uuidv4 } = require("uuid");
const HoSo = db.HoSoBenhAn;
const BenhNhan = db.BenhNhan;

exports.getAll = async (req, res) => {
  try {
    const data = await HoSo.findAll({
      include: [BenhNhan],
      order: [["ngayLap", "DESC"]],
    });
    res.json({ success: true, data });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi truy xuất hồ sơ", error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { maBN, dotKhamBenh, lichSuBenh, ghiChu } = req.body;
    const maHSBA = uuidv4().slice(0, 8).toUpperCase();
    const created = await HoSo.create({
      maHSBA,
      maBN,
      dotKhamBenh,
      lichSuBenh,
      ghiChu
    });
    res.status(201).json({ success: true, message: "Tạo hồ sơ thành công", data: created });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi tạo hồ sơ", error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await HoSo.destroy({ where: { maHSBA: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Không tìm thấy hồ sơ" });
    }
    res.json({ success: true, message: "Đã xoá hồ sơ bệnh án" });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi xoá hồ sơ", error: err.message });
  }
};
