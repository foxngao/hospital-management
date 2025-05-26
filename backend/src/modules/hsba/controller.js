const db = require("../../models");
const { v4: uuidv4 } = require("uuid");

const HoSoBenhAn = db.HoSoBenhAn;
const BenhNhan = db.BenhNhan;
const DonThuoc = db.DonThuoc;
const ChiTietDonThuoc = db.ChiTietDonThuoc;
const PhieuKham = db.PhieuKham;
const PhieuXetNghiem = db.PhieuXetNghiem;

exports.getAll = async (req, res) => {
  try {
    const data = await HoSoBenhAn.findAll({
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
    const created = await HoSoBenhAn.create({
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
  const { id } = req.params;
  const transaction = await db.sequelize.transaction();

  try {
    // 1. Lấy tất cả đơn thuốc thuộc HSBA
    const donThuocList = await DonThuoc.findAll({
      where: { maHSBA: id },
      transaction,
    });
    const maDTList = donThuocList.map((dt) => dt.maDT);

    // 2. Xoá chi tiết đơn thuốc
    if (maDTList.length > 0) {
      await ChiTietDonThuoc.destroy({
        where: { maDT: maDTList },
        transaction,
      });
    }

    // 3. Xoá đơn thuốc
    await DonThuoc.destroy({
      where: { maHSBA: id },
      transaction,
    });

    // 4. Xoá phiếu khám
    await PhieuKham.destroy({
      where: { maHSBA: id },
      transaction,
    });

    // 5. Xoá phiếu xét nghiệm
    await PhieuXetNghiem.destroy({
      where: { maHSBA: id },
      transaction,
    });

    // 6. Xoá hồ sơ bệnh án
    const deleted = await HoSoBenhAn.destroy({
      where: { maHSBA: id },
      transaction,
    });

    if (!deleted) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: "Không tìm thấy hồ sơ" });
    }

    await transaction.commit();
    res.json({ success: true, message: "Đã xoá toàn bộ hồ sơ, đơn thuốc, phiếu khám và xét nghiệm liên quan" });
  } catch (err) {
    await transaction.rollback();
    console.error("❌ Lỗi Sequelize:", err);
    res.status(500).json({ success: false, message: "Lỗi xoá hồ sơ", error: err.message });
  }
};

exports.getByBenhNhan = async (req, res) => {
  try {
    const maBN = req.params.maBN || req.user?.maBN;
    if (!maBN) return res.status(400).json({ message: "Thiếu mã bệnh nhân" });

    const data = await HoSoBenhAn.findAll({
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
