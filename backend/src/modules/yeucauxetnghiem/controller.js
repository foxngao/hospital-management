const db = require("../../models");
const { v4: uuidv4 } = require("uuid");
const YeuCauXetNghiem = db.YeuCauXetNghiem;
const BenhNhan = db.BenhNhan;
const BacSi = db.BacSi;

exports.getAll = async (req, res) => {
  try {
    const result = await YeuCauXetNghiem.findAll({
      include: [{ model: BenhNhan }, { model: BacSi }],
      order: [["ngayYeuCau", "DESC"]],
    });
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi truy xuất dữ liệu", error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { maBN, maBS, loaiYeuCau, trangThai } = req.body;
    const maYeuCau = uuidv4().slice(0, 8).toUpperCase();
    const created = await YeuCauXetNghiem.create({
      maYeuCau, maBN, maBS, loaiYeuCau, trangThai
    });
    res.status(201).json({ success: true, message: "Tạo yêu cầu thành công", data: created });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi tạo yêu cầu", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { trangThai } = req.body;
    const [updated] = await YeuCauXetNghiem.update({ trangThai }, {
      where: { maYeuCau: req.params.id }
    });
    if (!updated) return res.status(404).json({ success: false, message: "Không tìm thấy yêu cầu" });
    res.json({ success: true, message: "Đã cập nhật yêu cầu" });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi cập nhật", error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await YeuCauXetNghiem.destroy({ where: { maYeuCau: req.params.id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Không tìm thấy để xoá" });
    res.json({ success: true, message: "Đã xoá yêu cầu" });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi xoá", error: err.message });
  }
};
