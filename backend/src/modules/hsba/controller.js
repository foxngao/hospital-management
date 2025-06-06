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

exports.getByBenhNhan = async (req, res) => {
  try {
    const maBN = req.params.maBN || req.user?.maBN;
    if (!maBN) return res.status(400).json({ message: "Thiếu mã bệnh nhân" });

    const data = await HoSo.findAll({
      where: { maBN },
      include: [BenhNhan],
      order: [["ngayLap", "DESC"]],
    });

    res.json({ message: "Lấy hồ sơ bệnh án theo bệnh nhân", data });
  } catch (err) {
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ message: "Lỗi truy xuất hồ sơ", error: err.message });
  }
};


exports.createByBenhNhan = async (req, res) => {
  try {
    const { maBN } = req.body;
    if (!maBN) return res.status(400).json({ success: false, message: "Thiếu mã bệnh nhân" });

    const today = new Date().toISOString().slice(0, 10); // yyyy-MM-dd
    const dot = new Date().toISOString().slice(0, 7);

    // Kiểm tra trùng mã
    const existed = await db.HoSoBenhAn.findOne({ where: { maBN } });
    if (existed) {
      return res.status(200).json({ success: true, message: "Đã có hồ sơ", data: existed });
    }

    // ✅ FIX: tự khởi tạo dotKhamBenh = 0, các trường khác NULL
    const hoso = await db.HoSoBenhAn.create({
      maHSBA: maBN,
      maBN,
      ngayLap: today,
      dotKhamBenh: dot,
      lichSuBenh: null,
      ghiChu: null
    });

    return res.status(201).json({ success: true, message: "✅ Tạo hồ sơ bệnh án thành công", data: hoso });
  } catch (err) {
    console.error("❌ Lỗi tạo HSBA:", err);
    return res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
};


exports.getByMaBN = async (req, res) => {
  try {
    const { maHSBA } = req.params;
    if (!maHSBA) return res.status(400).json({ success: false, message: "Thiếu mã bệnh nhân" });

    const data = await db.HoSoBenhAn.findOne({
      where: {
          maHSBA: maHSBA  // Truy tìm đúng trường trong CSDL
        }
    } );

    if (!data) {
      return res.status(404).json({ success: false, message: "Không tìm thấy hồ sơ bệnh án" });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("❌ Lỗi lấy hồ sơ:", err);
    return res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
};


