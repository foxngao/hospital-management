// CONTROLLER: Ghi nhận đơn thuốc và chi tiết đơn thuốc
const { v4: uuidv4 } = require("uuid");
const { DonThuoc, ChiTietDonThuoc } = require("./model");

// Lấy tất cả đơn thuốc
exports.getAll = async (req, res) => {
  try {
    const list = await DonThuoc.findAll({ order: [["ngayKeDon", "DESC"]] });
    res.json({ message: "Lấy danh sách đơn thuốc", data: list });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi lấy danh sách", error: err.message });
  }
};

// ✅ Tạo đơn thuốc rỗng
exports.create = async (req, res) => {
  try {
    const { maHSBA, maBS } = req.body;
    const maDT = uuidv4().slice(0, 8).toUpperCase();

    const created = await DonThuoc.create({
      maDT,
      maHSBA,
      maBS,
      maThuoc: null, // đơn rỗng, thuốc thêm sau
    });

    res.status(201).json({ message: "Tạo đơn thuốc thành công", data: created });
  } catch (err) {
    console.error("❌ Lỗi tạo đơn thuốc:", err);
    console.error("🔍 Chi tiết:", err?.original?.sqlMessage);
    res.status(500).json({ message: "Lỗi tạo đơn thuốc", error: err.message });
  }
};

// Thêm chi tiết đơn thuốc
exports.addChiTiet = async (req, res) => {
  try {
    const { maDT, maThuoc, soLuong, lieuDung } = req.body;
    const maCTDT = uuidv4().slice(0, 8).toUpperCase();

    const detail = await ChiTietDonThuoc.create({
      maCTDT,
      maDT,
      maThuoc,
      soLuong,
      lieuDung,
    });

    res.status(201).json({ message: "Thêm chi tiết đơn thuốc thành công", data: detail });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi thêm chi tiết", error: err.message });
  }
};

// Lấy chi tiết đơn thuốc theo mã đơn
exports.getChiTiet = async (req, res) => {
  try {
    const { maDT } = req.params;
    const list = await ChiTietDonThuoc.findAll({ where: { maDT } });
    res.json({ message: "Chi tiết đơn thuốc", data: list });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi lấy chi tiết", error: err.message });
  }
};
