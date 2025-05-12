// CONTROLLER: Ghi nhận phiếu khám bệnh từ bác sĩ
const { v4: uuidv4 } = require("uuid");
const { PhieuKham } = require("./model");

// Lấy tất cả phiếu khám (ADMIN hoặc BÁC SĨ)
exports.getAll = async (req, res) => {
  try {
    const list = await PhieuKham.findAll({ order: [["ngayKham", "DESC"]] });
    res.json({ message: "Lấy danh sách phiếu khám", data: list });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi lấy phiếu khám", error: err.message });
  }
};

// Lấy phiếu khám theo bác sĩ
exports.getByBacSi = async (req, res) => {
  try {
    const { maBS } = req.params;
    const data = await PhieuKham.findAll({ where: { maBS }, order: [["ngayKham", "DESC"]] });
    res.json({ message: "Lấy phiếu khám theo bác sĩ", data });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi lấy phiếu theo bác sĩ", error: err.message });
  }
};

// Tạo phiếu khám mới
exports.create = async (req, res) => {
  try {
    const { maHSBA, maBN, maBS, trieuChung, chuanDoan, loiDan, trangThai } = req.body;
    const maPK = uuidv4().slice(0, 8).toUpperCase();

    const created = await PhieuKham.create({
      maPK, maHSBA, maBN, maBS, trieuChung, chuanDoan, loiDan, trangThai
    });

    res.status(201).json({ message: "Tạo phiếu khám thành công", data: created });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi tạo phiếu khám", error: err.message });
  }
};

// Cập nhật phiếu khám
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { trieuChung, chuanDoan, loiDan, trangThai } = req.body;

    const [updated] = await PhieuKham.update(
      { trieuChung, chuanDoan, loiDan, trangThai },
      { where: { maPK: id } }
    );

    if (!updated) return res.status(404).json({ message: "Không tìm thấy phiếu để cập nhật" });

    res.json({ message: "Cập nhật phiếu khám thành công" });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi cập nhật phiếu khám", error: err.message });
  }
};

// Xoá phiếu khám
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PhieuKham.destroy({ where: { maPK: id } });

    if (!deleted) return res.status(404).json({ message: "Không tìm thấy phiếu để xoá" });

    res.json({ message: "Xoá phiếu khám thành công" });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi xoá phiếu khám", error: err.message });
  }
};
