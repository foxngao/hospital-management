const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HoSoBenhAn = require("../../models/HoSoBenhAn");

/**
 * Lấy toàn bộ hồ sơ bệnh án – chỉ BACSI hoặc ADMIN
 * Có thể lọc theo `maBN`
 */
exports.getAll = async (req, res) => {
  try {
    const { maBN } = req.query;

    const whereClause = maBN ? { maBN } : {};

    const result = await HoSoBenhAn.findAll({ where: whereClause });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách", error: error.message });
  }
};

/**
 * Xem 1 hồ sơ bệnh án cụ thể – role-based
 */
exports.getById = async (req, res) => {
  try {
    const { maTK, maNhom } = req.user;
    const { id } = req.params;

    const record = await HoSoBenhAn.findByPk(id);
    if (!record)
      return res.status(404).json({ message: "Không tìm thấy hồ sơ bệnh án" });

    // Bệnh nhân chỉ được xem hồ sơ của chính mình
    if (maNhom === "BENHNHAN" && record.maBN !== maTK) {
      return res.status(403).json({ message: "Bạn không có quyền truy cập hồ sơ này" });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Lỗi truy xuất hồ sơ", error: error.message });
  }
};

/**
 * Tạo mới hồ sơ bệnh án – chỉ BACSI
 */
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { maBN, dotKhamBenh, lichSuBenh, ghiChu } = req.body;

    const newRecord = await HoSoBenhAn.create({
      maHSBA: uuidv4(),
      maBN,
      dotKhamBenh,
      lichSuBenh,
      ghiChu,
    });

    res.status(201).json({ message: "Tạo hồ sơ bệnh án thành công", data: newRecord });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo hồ sơ", error: error.message });
  }
};

/**
 * Cập nhật hồ sơ bệnh án – chỉ BACSI
 */
exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { id } = req.params;
    const record = await HoSoBenhAn.findByPk(id);

    if (!record)
      return res.status(404).json({ message: "Không tìm thấy hồ sơ để cập nhật" });

    const { dotKhamBenh, lichSuBenh, ghiChu, maBN } = req.body;

    await record.update({ dotKhamBenh, lichSuBenh, ghiChu, maBN });

    res.json({ message: "Cập nhật thành công", data: record });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật", error: error.message });
  }
};

/**
 * Xoá hồ sơ bệnh án – chỉ ADMIN
 */
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await HoSoBenhAn.findByPk(id);

    if (!record)
      return res.status(404).json({ message: "Không tìm thấy hồ sơ để xoá" });

    await record.destroy();
    res.json({ message: "Xoá hồ sơ thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xoá", error: error.message });
  }
};
